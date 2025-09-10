<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class AuthController extends Controller
{
    
    public function register(Request $request)
    {
        \Log::info('REGISTER HIT');
        $validatedData = $request->validate([
            'first_name' => [
            'required',
            'string',
            'max:50',
            'regex:/^[А-ЯЁ][а-яё]*(?:-[А-ЯЁ][а-яё]*)*$/u'
        ],
        'last_name' => [
            'required',
            'string',
            'max:50',
            'regex:/^[А-ЯЁ][а-яё]*(?:-[А-ЯЁ][а-яё]*)*$/u'
        ],
        'middle_name' => [
            'nullable',
            'string',
            'max:50',
            'regex:/^[А-ЯЁ][а-яё]*(?:-[А-ЯЁ][а-яё]*)*$/u'
        ],
        'email' => [
            'required',
            'string',
            'email', 
            'max:255',
            'unique:users'
        ],
        'phone' => [
            'required',
            'string',
            'regex:/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/',
            'unique:users'
        ],
        'password' => [
            'required',
            'string',
            'min:8',
            'confirmed',
            'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/'
        ],
        ], [
            'first_name.regex' => 'Имя должно начинаться с заглавной буквы и может содержать дефис',
            'last_name.regex' => 'Фамилия должна начинаться с заглавной буквы и может содержать дефис',
            'middle_name.regex' => 'Отчество должно начинаться с заглавной буквы и может содержать дефис',
            'phone.regex' => 'Телефон должен быть в формате +7(999)123-45-67',
            'password.regex' => 'Пароль должен содержать минимум 8 символов, одну заглавную букву, одну цифру и один спецсимвол',
            'email.unique' => 'Этот email уже занят',
            'phone.unique' => 'Этот телефон уже занят',
        ]);

        // Нормализация имен
        $validatedData['first_name'] = $this->normalizeName($validatedData['first_name']);
        $validatedData['last_name'] = $this->normalizeName($validatedData['last_name']);
        $validatedData['middle_name'] = !empty($validatedData['middle_name']) 
            ? $this->normalizeName($validatedData['middle_name'])
            : null;

        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = User::create($validatedData);
        
        $user->assignRole('customer');

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'Регистрация успешна',
            'token' => $token,
            'user' => $user,
        ]);
    }

    private function normalizeName(string $name): string
    {
        $parts = explode('-', $name);
        $normalizedParts = array_map(function($part) {
            return Str::ucfirst(Str::lower($part));
        }, $parts);
        return implode('-', $normalizedParts);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['message' => 'Неверные учетные данные'], 401);
        }

        return response()->json([
            'message' => 'Успешный вход',
            'token' => $token,
            'user' => auth()->user(),
        ]);
    }

    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json(['message' => 'Вы успешно вышли']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ошибка выхода'], 500);
        }
    }

    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|max:2048',
        ]);

        $user = auth()->user();
        $file = $request->file('avatar');

        try {
            
            $upload = Cloudinary::upload($file->getRealPath(), [
                'folder' => 'avatars',
                'public_id' => 'user_' . $user->id,
                'overwrite' => true,
                'resource_type' => 'image'
            ]);
            
            
            $avatarUrl = $upload->getSecurePath();

            $user->avatar = $avatarUrl;
            $user->save();

            return response()->json([
                'message' => 'Аватар успешно загружен',
                'url' => $avatarUrl
            ])->withHeaders([
                'Cache-Control' => 'no-store, no-cache, must-revalidate',
                'Pragma' => 'no-cache'
            ]);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Ошибка загрузки: ' . $e->getMessage()], 500);
        }
    }

}
