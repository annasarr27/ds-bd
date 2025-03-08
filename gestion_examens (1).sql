CREATE DATABASE  IF NOT EXISTS `gestion_examens` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gestion_examens`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: gestion_examens
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `chatbot_logs`
--

DROP TABLE IF EXISTS `chatbot_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatbot_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `etudiant_id` int DEFAULT NULL,
  `question` text,
  `reponse` text,
  `date_interaction` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `etudiant_id` (`etudiant_id`),
  CONSTRAINT `chatbot_logs_ibfk_1` FOREIGN KEY (`etudiant_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatbot_logs`
--

LOCK TABLES `chatbot_logs` WRITE;
/*!40000 ALTER TABLE `chatbot_logs` DISABLE KEYS */;
INSERT INTO `chatbot_logs` VALUES (2,10,'Qu\'est-ce qu\'une intégrale ?','Une intégrale est utilisée pour calculer l\'aire sous une courbe et pour déterminer la primitive d\'une fonction.','2025-03-07 21:26:16');
/*!40000 ALTER TABLE `chatbot_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exams`
--

DROP TABLE IF EXISTS `exams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  `description` text,
  `enseignant_id` int DEFAULT NULL,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fichier_exam` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `enseignant_id` (`enseignant_id`),
  CONSTRAINT `exams_ibfk_1` FOREIGN KEY (`enseignant_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exams`
--

LOCK TABLES `exams` WRITE;
/*!40000 ALTER TABLE `exams` DISABLE KEYS */;
INSERT INTO `exams` VALUES (2,'Examen de Mathématiques','Examen sur les fonctions et les dérivées',1,'2025-03-06 22:24:31','math_exam.pdf'),(3,'Examen de Mathématiques','Examen sur les fonctions',4,'2025-03-07 17:19:39','math_exam.pdf'),(4,'Examen de Physique Quantique','Examen sur les principes de base de la physique quantique',11,'2025-03-07 20:01:46','physique_quantique_exam.pdf'),(5,'Examen de Physique Quantique','Examen sur les principes de base de la physique quantique',11,'2025-03-07 20:35:53','physique_quantique_exam.pdf');
/*!40000 ALTER TABLE `exams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plagiarism_reports`
--

DROP TABLE IF EXISTS `plagiarism_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plagiarism_reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `submission_id` int DEFAULT NULL,
  `score_plagiat` decimal(5,2) DEFAULT NULL,
  `rapport_details` text,
  `date_generation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `submission_id` (`submission_id`),
  CONSTRAINT `plagiarism_reports_ibfk_1` FOREIGN KEY (`submission_id`) REFERENCES `submissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plagiarism_reports`
--

LOCK TABLES `plagiarism_reports` WRITE;
/*!40000 ALTER TABLE `plagiarism_reports` DISABLE KEYS */;
INSERT INTO `plagiarism_reports` VALUES (3,6,15.50,'Des similitudes ont été détectées avec d\'autres copies.','2025-03-06 23:02:12');
/*!40000 ALTER TABLE `plagiarism_reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submissions`
--

DROP TABLE IF EXISTS `submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `etudiant_id` int DEFAULT NULL,
  `exam_id` int DEFAULT NULL,
  `fichier_submission` varchar(255) DEFAULT NULL,
  `date_submission` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `corrige_auto` text,
  `note_auto` decimal(5,2) DEFAULT NULL,
  `note_finale` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `etudiant_id` (`etudiant_id`),
  KEY `exam_id` (`exam_id`),
  CONSTRAINT `submissions_ibfk_1` FOREIGN KEY (`etudiant_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `submissions_ibfk_2` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submissions`
--

LOCK TABLES `submissions` WRITE;
/*!40000 ALTER TABLE `submissions` DISABLE KEYS */;
INSERT INTO `submissions` VALUES (6,3,2,'math_submission.pdf','2025-03-06 22:54:26',NULL,NULL,NULL),(10,2,2,'physique_submission.pdf','2025-03-07 02:07:50',NULL,NULL,NULL),(12,11,4,'nouvelle_soumission_physique_quantique.pdf','2025-03-07 20:04:41',NULL,NULL,NULL);
/*!40000 ALTER TABLE `submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `role` enum('enseignant','etudiant','admin') DEFAULT NULL,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jane Doe','jane.doe@example.com','newpassword123','enseignant','2025-03-05 20:20:52'),(2,'Etudiant Y','etudianty@email.com','password_hash','etudiant','2025-03-05 20:20:52'),(3,'John Doe','john.doe@example.com','password123','etudiant','2025-03-06 21:29:10'),(4,'Enseignant X','enseignant@example.com','$2b$10$pGHIltAnxezFdCw.muNOp.FlMLhhtlrglX4aXv396aeO8fAhgoo/q','enseignant','2025-03-07 17:08:00'),(5,'Étudiant X','etudiantx@example.com','$2b$10$wSpiJymDYxhB5sSxorHAY.EjyTRZhEjahhQ3IrsYtgbHK5bUA5mNq','etudiant','2025-03-07 18:10:32'),(8,'Étudiant Z','etudiantz@example.com','$2b$10$tBPNKKlTBXI7bJDZbi80jOAdWQImRK5Tar0uTTd70EuAb5k6zR/Ke','etudiant','2025-03-07 18:44:56'),(9,'Moustapha Lo','moustapha@example.com','$2b$10$gexkkyPODFG./dlDSFyCPOpu6CbV2.gI8I0QBh2wtR0r5J3jIL.4C','etudiant','2025-03-07 19:10:37'),(10,'Étudiant W','etudiantw@example.com','$2b$10$RyKlE5RsbaCtN3wlpp3JwuTP1tz1aqPrAUF8vdaIjt7l60.slEXiW','etudiant','2025-03-07 19:47:05'),(11,'Professeur Z','professeurz@example.com','$2b$10$snroP58Ysf2xyWvefqfdAe7EUPzBm8SYIXew292u10sxPBH/VgxkK','enseignant','2025-03-07 19:49:17'),(12,'administrateur A','admin@example.com','$2b$10$EaZsAFyjOsSpDQL8V2az6ebo5nnDeMWh2NC9Pv8CvxMtZvl6H27N6','admin','2025-03-07 21:41:39');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'gestion_examens'
--

--
-- Dumping routines for database 'gestion_examens'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-07 22:42:28
