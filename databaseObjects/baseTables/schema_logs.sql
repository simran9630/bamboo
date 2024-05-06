CREATE TABLE `schema_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `version` varchar(50) NOT NULL,
  `description` text,
  `checksum` varchar(64) NOT NULL,
  `status` varchar(20) NOT NULL,
  `ownername` varchar(100) NOT NULL,
  `executedfile` varchar(100) NOT NULL,
  `applied_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

