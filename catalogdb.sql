CREATE DATABASE  IF NOT EXISTS `catalogdb` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `catalogdb`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: catalogdb
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'Ficção Científica'),(2,'Ação'),(3,'Comédia'),(4,'Romance'),(5,'Documentário');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `obra`
--

DROP TABLE IF EXISTS `obra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `obra` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(1000) DEFAULT NULL,
  `sinopsis` text,
  `type` tinyint(1) NOT NULL,
  `genre_id` int NOT NULL,
  `watched` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `obra_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obra`
--

LOCK TABLES `obra` WRITE;
/*!40000 ALTER TABLE `obra` DISABLE KEYS */;
INSERT INTO `obra` VALUES (1,'Interstellar','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0zt0lp-O3XdL8zzdrEvyzmcl6kOwfgbv4xQ&s','A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.',1,1,0),(2,'Mad Max: Fury Road','https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg','In a post-apocalyptic wasteland, Max teams up with Furiosa to escape a tyrant and his army.',1,2,1),(3,'The Hangover','https://m.media-amazon.com/images/M/MV5BNGQwZjg5YmYtY2VkNC00NzliLTljYTctNzI5NmU3MjE2ODQzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg','Three friends wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing.',0,3,1),(4,'Pride and Prejudice','https://m.media-amazon.com/images/M/MV5BMTA1NDQ3NTcyOTNeQTJeQWpwZ15BbWU3MDA0MzA4MzE@._V1_.jpg','Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy.',0,4,0),(5,'Planet Earth','https://m.media-amazon.com/images/M/MV5BMTg3MDcxODYyNF5BMl5BanBnXkFtZTgwNzU1NDkwMDE@._V1_FMjpg_UX1000_.jpg','A documentary series showcasing the diverse habitats of the world.',1,5,1);
/*!40000 ALTER TABLE `obra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `id` int NOT NULL AUTO_INCREMENT,
  `obra_id` int NOT NULL,
  `note` decimal(2,1) DEFAULT NULL,
  `observations` text,
  PRIMARY KEY (`id`),
  KEY `obra_id` (`obra_id`),
  CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`obra_id`) REFERENCES `obra` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
INSERT INTO `rating` VALUES (1,1,4.5,'Great movie with stunning visuals.'),(2,2,4.0,'Action-packed and thrilling.'),(3,3,3.5,'Funny and entertaining, but predictable plot.'),(4,4,4.8,'Classic romance story with excellent performances.'),(5,5,4.7,'Beautifully shot documentary showcasing the wonders of nature.');
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-18 21:43:43
