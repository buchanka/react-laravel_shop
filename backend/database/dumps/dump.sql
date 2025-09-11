-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3310
-- Время создания: Авг 14 2025 г., 00:08
-- Версия сервера: 8.0.30
-- Версия PHP: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `my_shop`
--

-- --------------------------------------------------------

--
-- Структура таблицы `carts`
--

CREATE TABLE `carts` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `total_price` decimal(12,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `total_price`, `created_at`, `updated_at`) VALUES
(1, 7, '0.00', '2025-06-22 06:10:27', '2025-06-22 11:03:19'),
(2, 18, '0.00', '2025-06-23 05:06:27', '2025-06-23 05:06:41'),
(3, 19, '0.00', '2025-06-23 05:11:38', '2025-08-09 08:54:44'),
(4, 20, '0.00', '2025-07-06 11:34:15', '2025-07-06 11:36:06'),
(5, 21, '0.00', '2025-07-07 13:52:43', '2025-07-13 13:54:48');

-- --------------------------------------------------------

--
-- Структура таблицы `cart_items`
--

CREATE TABLE `cart_items` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int UNSIGNED NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `cart_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Парафиновые свечи', '2025-05-08 14:30:15', '2025-06-20 12:05:29'),
(2, 'Восковые свечи', '2025-05-08 18:01:20', '2025-05-08 18:01:20'),
(3, 'Соевые свечи', '2025-05-08 18:01:33', '2025-05-08 18:01:33'),
(4, 'Гелевые свечи', '2025-05-08 18:08:46', '2025-05-08 18:08:46');

-- --------------------------------------------------------

--
-- Структура таблицы `collections`
--

CREATE TABLE `collections` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `collections`
--

INSERT INTO `collections` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Воск и вечность', '2025-06-20 11:10:46', '2025-06-20 11:10:46'),
(2, 'Крылья и лепестки', '2025-06-20 11:11:36', '2025-06-20 11:11:36'),
(3, 'Металлический блеск', '2025-06-20 11:11:59', '2025-06-20 11:11:59'),
(4, 'Резной узор', '2025-06-20 11:12:14', '2025-06-20 11:12:14'),
(5, 'Чистые формы', '2025-06-20 11:12:48', '2025-06-20 11:12:48'),
(6, 'Яркие акценты', '2025-06-20 11:13:05', '2025-06-20 11:13:05');

-- --------------------------------------------------------

--
-- Структура таблицы `collection_product`
--

CREATE TABLE `collection_product` (
  `id` bigint UNSIGNED NOT NULL,
  `collection_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `collection_product`
--

INSERT INTO `collection_product` (`id`, `collection_id`, `product_id`, `created_at`, `updated_at`) VALUES
(1, 6, 6, NULL, NULL),
(2, 4, 6, NULL, NULL),
(3, 2, 6, NULL, NULL),
(7, 1, 7, NULL, NULL),
(8, 5, 7, NULL, NULL),
(9, 1, 8, NULL, NULL),
(10, 5, 8, NULL, NULL),
(11, 5, 9, NULL, NULL),
(12, 2, 9, NULL, NULL),
(13, 5, 10, NULL, NULL),
(14, 2, 10, NULL, NULL),
(15, 2, 12, NULL, NULL),
(16, 6, 12, NULL, NULL),
(17, 3, 13, NULL, NULL),
(18, 5, 13, NULL, NULL),
(19, 6, 13, NULL, NULL),
(20, 5, 11, NULL, NULL),
(21, 3, 11, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `favorites`
--

CREATE TABLE `favorites` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `product_id`, `image`, `created_at`, `updated_at`) VALUES
(13, 21, 9, 'https://storage.yandexcloud.net/new-test-bucket-123/product_img/product_1750619455.jpg', '2025-07-07 13:52:38', '2025-07-07 13:52:38'),
(14, 21, 7, 'https://storage.yandexcloud.net/new-test-bucket-123/product_img/product_1750618819.jpg', '2025-07-13 13:23:55', '2025-07-13 13:23:55');

-- --------------------------------------------------------

--
-- Структура таблицы `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2014_10_12_100000_create_password_resets_table', 1),
(4, '2019_08_19_000000_create_failed_jobs_table', 1),
(5, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(6, '2025_04_30_145412_add_fio_to_users_table', 1),
(7, '2025_05_03_125100_create_categories_table', 1),
(8, '2025_05_03_125345_create_products_table', 1),
(9, '2025_05_03_125602_create_orders_table', 1),
(10, '2025_05_03_130351_create_order_items_table', 1),
(11, '2025_05_03_130520_create_favorites_table', 1),
(12, '2025_05_03_130651_create_carts_table', 1),
(13, '2025_05_03_133219_create_permission_tables', 1),
(14, '2025_05_12_173923_remove_user_id_from_cart_items_table', 2),
(15, '2025_06_01_024148_update_phone_default_in_users_table', 3),
(16, '2025_06_01_191240_add_avatar_to_users_table', 4),
(17, '2025_06_02_085743_create_roles_table', 5),
(18, '2025_06_19_013201_add_dimensions_to_products_table', 6),
(19, '2025_06_19_020807_create_collections_table', 7),
(20, '2025_06_19_020856_add_collection_id_to_products_table', 7),
(21, '2025_06_19_021636_create_collection_product_table', 8),
(22, '2025_06_19_021935_remove_collection_id_from_products_table', 9),
(23, '2025_06_20_103626_add_stock_to_products_table', 10),
(24, '2025_06_20_105838_create_reserved_stocks_table', 11),
(25, '2025_06_21_224601_add_image_to_cart_items_table', 12),
(26, '2025_06_21_224632_add_image_to_order_items_table', 12),
(27, '2025_06_22_095002_add_image_to_favorites_table', 13),
(28, '2025_06_22_130650_add_fields_to_orders_table', 14),
(29, '2025_06_22_132257_add_table_payments', 15);

-- --------------------------------------------------------

--
-- Структура таблицы `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 2),
(2, 'App\\Models\\User', 3),
(2, 'App\\Models\\User', 4),
(2, 'App\\Models\\User', 5),
(2, 'App\\Models\\User', 7),
(2, 'App\\Models\\User', 9),
(2, 'App\\Models\\User', 10),
(2, 'App\\Models\\User', 11),
(2, 'App\\Models\\User', 12),
(2, 'App\\Models\\User', 13),
(2, 'App\\Models\\User', 14),
(2, 'App\\Models\\User', 16),
(2, 'App\\Models\\User', 17),
(2, 'App\\Models\\User', 18),
(2, 'App\\Models\\User', 19),
(2, 'App\\Models\\User', 20),
(2, 'App\\Models\\User', 21);

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `status` enum('принят','подтвержден','отправлен','доставлен','отменен') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'принят',
  `total_price` decimal(10,2) NOT NULL,
  `shipping_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `status`, `total_price`, `shipping_address`, `phone`, `created_at`, `updated_at`) VALUES
(1, 7, 'отправлен', '577.00', 'Россия, Санкт-Петербург, ул. Примерная д.6 кв. 8', '+7(890)545-33-19', '2025-06-22 11:03:19', '2025-06-22 15:54:58'),
(2, 18, 'отменен', '577.00', 'Россия, Санкт-Петербург, ул. Примерная д.6 кв. 8', '+7(890)545-53-13', '2025-06-23 05:06:41', '2025-06-23 05:09:16'),
(3, 20, 'отправлен', '513.12', 'г. Санкт-Петербург, ул. Примерная, д.4 кв. 8', '+7(696)067-08-78', '2025-07-06 11:36:06', '2025-08-08 13:04:08'),
(4, 21, 'отправлен', '1528.00', 'Россия, Санкт-Петербург, ул. Примерная д.6 кв. 9', '+7(890)545-23-19', '2025-07-07 13:53:27', '2025-08-08 13:04:21'),
(5, 21, 'доставлен', '1375.62', 'Россия, Санкт-Петербург, ул. Примерная д.6 кв. 9', '+7(890)545-23-19', '2025-07-08 15:40:50', '2025-08-08 13:04:36'),
(6, 21, 'доставлен', '769.68', 'Россия, Санкт-Петербург, ул. Примерная д.6 кв. 9', '+7(890)545-33-13', '2025-07-08 16:08:11', '2025-08-09 11:53:53'),
(7, 21, 'подтвержден', '1368.00', 'Россия, Санкт-Петербург, ул. Примерная д.6 кв. 9', '+7(890)545-23-19', '2025-07-08 16:19:33', '2025-07-08 16:19:33'),
(8, 19, 'подтвержден', '1375.62', 'Россия, Санкт-Петербург, ул. Примерная д.6 кв. 9', '+7(890)545-33-16', '2025-08-09 08:54:44', '2025-08-09 08:54:44');

-- --------------------------------------------------------

--
-- Структура таблицы `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `quantity` int UNSIGNED NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `image`, `created_at`, `updated_at`) VALUES
(1, 1, 6, 1, '577.00', NULL, '2025-06-22 11:03:19', '2025-06-22 11:03:19'),
(2, 2, 6, 1, '577.00', NULL, '2025-06-23 05:06:41', '2025-06-23 05:06:41'),
(3, 3, 8, 2, '256.56', NULL, '2025-07-06 11:36:06', '2025-07-06 11:36:06'),
(4, 4, 12, 2, '764.00', NULL, '2025-07-07 13:53:27', '2025-07-07 13:53:27'),
(5, 5, 7, 3, '458.54', NULL, '2025-07-08 15:40:50', '2025-07-08 15:40:50'),
(6, 6, 8, 3, '256.56', NULL, '2025-07-08 16:08:11', '2025-07-08 16:08:11'),
(7, 7, 10, 3, '456.00', NULL, '2025-07-08 16:19:33', '2025-07-08 16:19:33'),
(8, 8, 7, 3, '458.54', NULL, '2025-08-09 08:54:44', '2025-08-09 08:54:44');

-- --------------------------------------------------------

--
-- Структура таблицы `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `payments`
--

CREATE TABLE `payments` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` bigint UNSIGNED NOT NULL,
  `card_last_four` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `payments`
--

INSERT INTO `payments` (`id`, `order_id`, `card_last_four`, `amount`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, '8990', '877.00', 'принят', '2025-06-22 11:03:20', '2025-06-22 11:03:20'),
(2, 2, '8990', '577.00', 'принят', '2025-06-23 05:06:42', '2025-06-23 05:06:42'),
(3, 3, '5555', '513.12', 'принят', '2025-07-06 11:36:06', '2025-07-06 11:36:06'),
(4, 4, '5456', '1528.00', 'принят', '2025-07-07 13:53:28', '2025-07-07 13:53:28'),
(5, 5, '8990', '1375.62', 'принят', '2025-07-08 15:40:51', '2025-07-08 15:40:51'),
(6, 6, '8430', '769.68', 'принят', '2025-07-08 16:08:11', '2025-07-08 16:08:11'),
(7, 7, '8430', '1368.00', 'принят', '2025-07-08 16:19:33', '2025-07-08 16:19:33'),
(8, 8, '8430', '1375.62', 'принят', '2025-08-09 08:54:44', '2025-08-09 08:54:44');

-- --------------------------------------------------------

--
-- Структура таблицы `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'manage users', 'web', '2025-05-03 12:51:33', '2025-05-03 12:51:33'),
(2, 'manage products', 'web', '2025-05-03 12:51:33', '2025-05-03 12:51:33'),
(3, 'manage orders', 'web', '2025-05-03 12:51:33', '2025-05-03 12:51:33'),
(4, 'view orders', 'web', '2025-05-03 12:51:33', '2025-05-03 12:51:33'),
(5, 'create order', 'web', '2025-05-03 12:51:33', '2025-05-03 12:51:33'),
(6, 'cancel order', 'web', '2025-05-03 12:51:33', '2025-05-03 12:51:33'),
(7, 'manage favorites', 'web', '2025-05-03 12:51:33', '2025-05-03 12:51:33'),
(8, 'manage cart', 'web', '2025-05-03 12:51:33', '2025-05-03 12:51:33');

-- --------------------------------------------------------

--
-- Структура таблицы `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` bigint UNSIGNED NOT NULL,
  `category_id` bigint UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `height` decimal(8,1) DEFAULT NULL COMMENT 'Height in cm',
  `width` decimal(8,1) DEFAULT NULL COMMENT 'Width in cm',
  `length` decimal(8,1) DEFAULT NULL COMMENT 'Length in cm',
  `burn_time` decimal(8,1) DEFAULT NULL COMMENT 'Burn time in hours',
  `stock` bigint NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `description`, `price`, `image`, `created_at`, `updated_at`, `height`, `width`, `length`, `burn_time`, `stock`) VALUES
(6, 2, 'Свеча Лазурная', 'Подарочная резная свеча - это оригинальный сувенир для человека любого возраста и пола. Свечи для дома декоративные - предмет декора для дома, коттеджа и квартиры. Декоративная интерьерная свеча высотой 15 см. Подарочная резная свеча отлично впишется в интерьер ванной и спальной комнат или кабинета. Резные свечи украшение интерьера практически любого стиля и дизайна, и даже как аксессуар для кухни. Венецианские декоративные резные свечи создаются руками мастера. Каждая свеча будет впечатляющей и уникальной потому, что завиток за завитком вырезается отдельно. Свечка ручной работы не только носит статическую но и практическую функции: ярко горят и вносят в интерьер особый шарм.', '577.00', 'https://res.cloudinary.com/dk5rocfla/image/upload/v1754681140/product_img/product_img/product_1754681022.jpg', '2025-06-20 12:40:12', '2025-08-08 16:23:44', '12.0', '6.0', '4.0', '40.0', 40),
(7, 2, 'Свеча Череп', 'Свеча декоративная восковая Череп. Восковая свеча это не просто источник света, а настоящий источник уюта и гармонии в вашем доме. Мягкое, теплое горение свечи поможет вам расслабиться после долгого дня, сосредоточиться на своих мыслях или просто насладиться моментом. Свеча для итерьера станет прекрасным дополнением в любом помещении, добавив ему нотку тепла и уюта. Свечи станут прекрасным дополнением к любому празднику, а также отлично подойдут для создания романтичной атмосферы на ужине или для расслабляющих вечеров. Подарочные свечи - это универсальный и всегда актуальный подарок. Сувениры ручной работы станут отличным выбором подарка подруге или коллеге на день рождения, добавив тепла и света в каждый дом. Красивые и стильные свечи могут стать прекрасным подарком гостям на свадьбу, день рождения или любой другой праздник.', '458.54', 'https://res.cloudinary.com/dk5rocfla/image/upload/v1754681249/product_img/product_img/product_1754681131.jpg', '2025-06-22 16:00:22', '2025-08-09 08:54:44', '7.0', '10.5', '4.4', '30.0', 38),
(8, 2, 'Свеча Луна и солнце', 'Интерьерная свеча изготовлена из натурального пчелиного воска с добавлением свечного. Хлопковый фитиль. Свеча ручной работы. Можно использовать для интерьера любого помещения, для романтического вечера, торжественных мероприятий, для домашнего и семейного очага. Так же можно украсить комнату, кабинет, гостиную, спальню. Идеально подойдут для подарка на 8 марта, Дни рождения, Новый год, День Влюбленных и другие. Свечи хорошо освещают пространство в вечернее и ночное время.', '256.56', 'https://res.cloudinary.com/dk5rocfla/image/upload/v1754681187/product_img/product_img/product_1754681069.jpg', '2025-06-22 16:03:41', '2025-08-08 16:24:32', '6.0', '6.0', '6.0', '39.9', 50),
(9, 1, 'Свеча Стрекоза', 'Декоративные свечи - это не только источник света, но и прекрасный элемент декора для вашего дома. Они создадут уютную атмосферу и могут использоваться в любом помещении. Свечи-столбики могут быть разных размеров и цветов, быть восковыми и парафиновыми, с помощью свечей можно собрать композицию, которая добавит завершенность Вашего интерьера и будет отражать Ваш собственный стиль в декоре.\n\nТак, например, свечи столбики большие могут использоваться в качестве элементов декора для толстых и высоких подсвечников, а маленькие можно разместить на столах или полках', '568.32', 'https://res.cloudinary.com/dk5rocfla/image/upload/v1754681201/product_img/product_img/product_1754681083.jpg', '2025-06-22 16:10:56', '2025-08-08 16:24:45', '10.5', '5.5', '4.9', '30.0', 40),
(10, 1, 'Свеча Цветочный шар', 'Свечи толстые для подсвечника могут стать приятным элементом декора в доме, а также создать соответствующий антураж и эстетику за праздничным столом или на романтическом свидании. В основу красивых интерьерных свечек входит премиальный пищевой очищенный парафин высокого качества, а также хлопковый фитиль. Свечи настольные обеденные станут прекрасным элементом декора. Свечи длинные декоративные для интерьера не выделяют вредных веществ при горении. Свечи эстетичные интерьерные не капают, не оставляют следов и дыма.', '456.00', 'https://res.cloudinary.com/dk5rocfla/image/upload/v1754681232/product_img/product_img/product_1754681114.jpg', '2025-06-22 16:14:05', '2025-08-08 16:25:16', '7.4', '5.6', '4.5', '40.0', 34),
(11, 3, 'Свеча Лотос', 'Свеча ароматическая интерьерная Лотос — это не просто источник света, а настоящий ароматный шедевр для вашего дома. Свеча изготовлена из натурального соевого воска и имеет продолжительное время горения — до 20 часов. Благодаря своей изящной форме, она станет прекрасным декоративным элементом в любом интерьере, а также может быть использована в качестве оригинального подарка.', '456.00', 'https://res.cloudinary.com/dk5rocfla/image/upload/v1754681169/product_img/product_img/product_1754681051.jpg', '2025-06-22 16:24:26', '2025-08-08 16:24:13', '7.4', '5.6', '4.5', '20.0', 40),
(12, 3, 'Свеча Цветок', 'Модель в виде эффектной композиции выполнена из высококачественного воска без добавления парафина. Необычные фигурные свечки в оригинальном дизайне заменяют обычные классические аксессуары, используются в качестве элемента декорации для фотозоны к тематической или семейной фотосессии, для создания уютной домашней атмосферы.', '764.00', 'https://res.cloudinary.com/dk5rocfla/image/upload/v1754681216/product_img/product_img/product_1754681099.webp', '2025-06-22 19:38:34', '2025-08-08 16:25:00', '15.0', '12.0', '5.6', '30.0', 36),
(13, 4, 'Свеча Шар', 'Эта свеча идеально подходит для романтических вечеров, особых случаев или для ежедневного использования, чтобы добавить уюта в ваш дом. Благодаря прочной и устойчивой основе, она безопасна в использовании и легко впишется в любой интерьер. Создайте теплую и уютную атмосферу с помощью этой стильной и функциональной свечи, которая подчеркнет ваш особый вкус и заботу о доме.', '458.98', 'https://res.cloudinary.com/dk5rocfla/image/upload/v1754681262/product_img/product_img/product_1754681144.jpg', '2025-06-22 19:40:56', '2025-08-08 16:25:46', '10.0', '10.0', '10.0', '21.0', 30);

-- --------------------------------------------------------

--
-- Структура таблицы `reserved_stocks`
--

CREATE TABLE `reserved_stocks` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `session_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `quantity` int UNSIGNED NOT NULL DEFAULT '1',
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2025-05-03 12:51:33', '2025-05-03 12:51:33'),
(2, 'customer', 'web', '2025-05-03 12:51:33', '2025-05-03 12:51:33');

-- --------------------------------------------------------

--
-- Структура таблицы `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 2),
(5, 2),
(6, 2),
(7, 2),
(8, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `middle_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `middle_name`, `email`, `avatar`, `email_verified_at`, `phone`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Админ', '-', NULL, 'admin@example.com', '', NULL, '+7(800)555-35-35', '$2y$12$bjrGwTK8ld2/AAU5.sIIAOUV.cjyd.2CDMoh.LgmlxSHjkymA7reC', NULL, '2025-05-03 12:51:33', '2025-06-21 11:03:38'),
(2, 'Пётр', 'Иванов', NULL, 'ivan441@example.com', 'https://res.cloudinary.com/dk5rocfla/image/upload/v1754681314/avatars/user_2.jpg', NULL, '+7(654)664-34-48', '$2y$12$qJ6lrNri0oDamb0ebMMuWOit8LTz.FLEEDz4qhYj/OIyQw1gNvFTW', NULL, '2025-05-03 12:51:34', '2025-08-08 16:26:37'),
(3, 'Арина', 'Федорова', 'Алексеевна', 'arisha23@gmail.com', 'https://res.cloudinary.com/dk5rocfla/image/upload/v1754681327/avatars/user_3.jpg', NULL, '+7(796)785-75-35', '$2y$12$gzQJOWulkg8VzY2EuQ9bo.WaCBhyIK0TLb17xj7FtEdzC9PlTefCC', NULL, '2025-05-03 13:08:25', '2025-08-08 16:26:51'),
(4, 'Павел', 'Максимов', 'Иванович', 'pavel334@ex.com', 'https://res.cloudinary.com/dk5rocfla/image/upload/v1754681363/avatars/user_4.jpg', NULL, '+7(890)545-33-15', '$2y$12$KGmAO0C7KqOSmjvm63Hm3eIcOvwuTPff/csyK9mk0uZCzq5Hvu6qG', NULL, '2025-06-01 00:22:47', '2025-08-08 16:27:26'),
(7, 'Игорь', 'Колоколов', 'Петрович', 'pavelv334@ex.com', '', NULL, '+7(890)545-33-19', '$2y$12$qmNPZcudn09/FAwvAamts.ffqYPXLhztEID0yLWDbtoHVxZ3QP1qW', NULL, '2025-06-07 17:44:00', '2025-06-17 14:30:59'),
(9, 'Олег', 'Воротов', NULL, 'oleg455@gmail.com', '', NULL, '+7(904)492-83-64', '$2y$12$JPuU.z5ibKhklJi6/KTAl.0MPB/xsWbevQGMQqs9V9KqwCmAtfOXC', NULL, '2025-06-15 18:21:24', '2025-06-16 20:08:27'),
(10, 'Владимир', 'Лебедев', 'Семёнович', 'vlad441@example.com', '', NULL, '+7(654)634-34-42', '$2y$12$shMChv5mtr/8kDZLcElXlezKuJV9b6W9mqRH.G2dCWP8kwa8Tx7oO', NULL, '2025-06-21 10:43:09', '2025-06-21 11:23:54'),
(11, 'Софья', 'Петрова', 'Львовна', 'sofya344@gmail.com', 'https://res.cloudinary.com/dk5rocfla/image/upload/v1754681412/avatars/user_11.webp', NULL, '+7(800)545-90-32', '$2y$12$nCtUEpFIngw6Ay3I2LAuSOqZZDdNeHMWri6xXgtZNTw4uJxHp9bre', NULL, '2025-06-21 11:46:23', '2025-08-08 16:28:16'),
(12, 'Максим', 'Воронов', 'Савельевич', 'maxim@ex.ru', '', NULL, '+7(800)545-90-12', '$2y$12$UmfJ7hKtO6TEngwIRTvX3.iqzPSnDZ7gLtVUywZ7CqGAT3bsn1Nvq', NULL, '2025-06-21 12:01:55', '2025-06-21 18:15:03'),
(13, 'Владимир', 'Фролов', 'Иванович', 'frolovttrer3@gmail.com', 'https://res.cloudinary.com/dk5rocfla/image/upload/v1754681577/avatars/user_13.jpg', NULL, '+7(904)494-33-64', '$2y$12$K6BHK.C6QmArZInDanAin.zVtnHpJDQauc7O/rScjv00NCmoCIz6u', NULL, '2025-06-21 12:19:25', '2025-08-08 16:31:00'),
(14, 'Михаил', 'Кузнецов', 'Евгеньевич', 'mikhail4545@gmail.com', NULL, NULL, '+7(904)494-82-64', '$2y$12$FIX1wrROCPCzUAvrNAjkW.6V6DCDCb5vo.11kcL/izZ5ALjFBLg6y', NULL, '2025-06-21 12:21:45', '2025-06-21 12:21:45'),
(16, 'Виктория', 'Кукушкина', 'Егоровна', 'victory344@gmail.com', 'https://res.cloudinary.com/dk5rocfla/image/upload/v1754681532/avatars/user_16.jpg', NULL, '+7(994)494-82-64', '$2y$12$znvnpSdNJc1YBcHwDK8LVeZlBvhv8YEY8oaTxd9a3ngqFzrgDPvXi', NULL, '2025-06-21 13:16:35', '2025-08-08 16:30:16'),
(17, 'Павел', 'Максимов', 'Иванович', 'pavelfg334@ex.com', NULL, NULL, '+7(890)545-33-13', '$2y$12$WhXoHTzAZ4L56Hda1HvdQOI6MvLM7ki.M/jVr4Lc8qeGs9MaOiIqe', NULL, '2025-06-22 19:22:20', '2025-06-22 19:22:20'),
(18, 'Павел', 'Максимов', 'Иванович', 'pavelf32334@ex.com', '', NULL, '+7(890)545-53-13', '$2y$12$d1bJFXUWobJ95qr6WKUFDe1H7VYoGpT5LtGxcdTIemPOITbmA2JbO', NULL, '2025-06-23 05:05:42', '2025-06-23 05:06:09'),
(19, 'Павел', 'Максимов', 'Иванович', 'pavelfg4334@ex.com', 'https://res.cloudinary.com/dk5rocfla/image/upload/v1754681036/avatars/user_19.jpg', NULL, '+7(890)545-33-16', '$2y$12$vD5kg2Mj6NvdzNU3kLs3Zuv2iawnq7Z9FXFhyewnmWplWZzuxUx8i', NULL, '2025-06-23 05:08:13', '2025-08-08 16:22:00'),
(20, 'Иван', 'Иванов', 'Иванович', 'ivan@fjfjkg.ru', NULL, NULL, '+7(696)067-08-78', '$2y$12$Xu2biU0em.BHVAkWOJMdkuQHLMjqA7mbYeOn.rcpc3O33djEXvZ4e', NULL, '2025-07-06 11:28:30', '2025-07-06 11:28:30'),
(21, 'Павел', 'Максимов', 'Леонидович', 'leofngjfj4955@mail.ru', NULL, NULL, '+7(890)545-23-19', '$2y$12$YIsau08POmyvnCE5uzyad.QV2QPZaJXKDbIm1ryw/NfRIfbOG5LFW', NULL, '2025-07-07 13:51:31', '2025-07-07 13:51:31');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_ibfk_1` (`user_id`);

--
-- Индексы таблицы `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_product_id_foreign` (`product_id`),
  ADD KEY `cart_id` (`cart_id`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `collection_product`
--
ALTER TABLE `collection_product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `collection_product_collection_id_product_id_unique` (`collection_id`,`product_id`),
  ADD KEY `collection_product_product_id_foreign` (`product_id`);

--
-- Индексы таблицы `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Индексы таблицы `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `favorites_user_id_product_id_unique` (`user_id`,`product_id`),
  ADD KEY `favorites_product_id_foreign` (`product_id`);

--
-- Индексы таблицы `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Индексы таблицы `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_id_foreign` (`user_id`);

--
-- Индексы таблицы `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);

--
-- Индексы таблицы `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Индексы таблицы `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Индексы таблицы `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payments_order_id_foreign` (`order_id`);

--
-- Индексы таблицы `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Индексы таблицы `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Индексы таблицы `reserved_stocks`
--
ALTER TABLE `reserved_stocks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reserved_stocks_user_id_foreign` (`user_id`),
  ADD KEY `reserved_stocks_product_id_session_id_index` (`product_id`,`session_id`),
  ADD KEY `reserved_stocks_product_id_user_id_index` (`product_id`,`user_id`);

--
-- Индексы таблицы `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Индексы таблицы `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `collections`
--
ALTER TABLE `collections`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `collection_product`
--
ALTER TABLE `collection_product`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT для таблицы `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `reserved_stocks`
--
ALTER TABLE `reserved_stocks`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `carts_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `collection_product`
--
ALTER TABLE `collection_product`
  ADD CONSTRAINT `collection_product_collection_id_foreign` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `collection_product_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Ограничения внешнего ключа таблицы `reserved_stocks`
--
ALTER TABLE `reserved_stocks`
  ADD CONSTRAINT `reserved_stocks_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reserved_stocks_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
