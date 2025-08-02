-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS `ferox-app` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE `ferox-app`;

-- Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(50) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100),
  `isActive` BOOLEAN DEFAULT FALSE,
  `activationCode` VARCHAR(20),
  `discordId` VARCHAR(50),
  `discordUsername` VARCHAR(100),
  `discordAvatar` VARCHAR(255),
  `recoveryCode` VARCHAR(20),
  `recoveryCodeExpires` DATETIME,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_unique` (`username`),
  UNIQUE KEY `email_unique` (`email`),
  UNIQUE KEY `discord_id_unique` (`discordId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;