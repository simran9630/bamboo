CREATE TABLE `class` (
  `strength` int DEFAULT NULL,
  `class` int DEFAULT NULL,
  `teacher` varchar(20) DEFAULT NULL,
  `section` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `demo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stud` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `student` (
  `name` varchar(20) DEFAULT NULL,
  `class` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
