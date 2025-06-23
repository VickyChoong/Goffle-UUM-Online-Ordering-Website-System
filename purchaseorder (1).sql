-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 23, 2025 at 08:11 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `interaction_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `purchaseorder`
--

CREATE TABLE `purchaseorder` (
  `productId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `note` varchar(500) NOT NULL,
  `totalPrice` decimal(10,2) NOT NULL DEFAULT 0.00,
  `timeSlot` varchar(20) NOT NULL,
  `deliveryFee` decimal(10,0) DEFAULT NULL,
  `receiverName` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `orderDate` datetime NOT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT 0,
  `receiverPhoneNo` varchar(255) DEFAULT NULL,
  `orderId` int(11) NOT NULL,
  `toppings` varchar(255) DEFAULT NULL,
  `sauce` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchaseorder`
--

INSERT INTO `purchaseorder` (`productId`, `userId`, `note`, `totalPrice`, `timeSlot`, `deliveryFee`, `receiverName`, `location`, `quantity`, `orderDate`, `paid`, `receiverPhoneNo`, `orderId`, `toppings`, `sauce`, `status`) VALUES
(7, 1, '', 17.70, '09:00AM - 11:30AM', NULL, 'derrick', NULL, 3, '2024-05-03 19:21:00', 1, '60174309025', 63, NULL, NULL, 1),
(1, 1, '', 4.00, '09:00AM - 11:30AM', NULL, 'derrick', NULL, 1, '2024-05-15 19:27:00', 1, '60174309025', 65, NULL, NULL, 1),
(1, 1, '', 16.00, '10:30AM - 12:0OPM', NULL, 'derrick', NULL, 4, '2025-05-21 02:14:00', 1, '60174309025', 67, NULL, NULL, 1),
(1, 1, '', 4.00, '10:30AM - 12:0OPM', NULL, 'derrick', NULL, 1, '2025-05-25 02:43:00', 1, '60174309025', 68, NULL, NULL, 1),
(1, 1, '', 5.00, '12:00PM - 01:3OPM', 1, NULL, 'TNB', 2, '2025-05-29 02:44:00', 1, NULL, 69, NULL, NULL, 1),
(1, 1, '', 5.00, '09:00AM - 11:30AM', 1, NULL, 'TNB', 2, '2025-06-11 12:44:00', 1, NULL, 70, NULL, NULL, 1),
(1, 3, 'Hello', 12.00, '10:30AM - 12:0OPM', NULL, 'derrick', NULL, 3, '2025-06-23 17:46:00', 1, '174309025', 71, NULL, NULL, 1),
(1, 2, '', 13.00, '10:30AM - 12:0OPM', 1, NULL, 'Proton/ Tradewinds', 3, '2025-06-25 17:59:00', 1, NULL, 72, NULL, NULL, 1),
(1, 2, '', 12.00, '09:00AM - 11:30AM', NULL, 'derrick', NULL, 3, '2025-06-30 11:44:00', 0, '60174309025', 73, NULL, NULL, 1),
(4, 2, 'Extra blueberry', 8.00, '10:30AM - 12:0OPM', NULL, 'cc', NULL, 2, '2023-07-02 14:43:07', 0, '123456789', 74, NULL, NULL, 1),
(6, 2, 'More Egg', 3.50, '12:00PM - 01:3OPM', 1, NULL, 'Petronas', 1, '2023-07-05 14:43:57', 0, NULL, 75, '[\'Lettuce\']', 'Barbeque', 1),
(7, 2, '', 5.90, '12:00PM - 01:3OPM', NULL, 'abu', NULL, 1, '2023-07-09 10:47:59', 0, '777896543', 76, NULL, NULL, 1),
(3, 2, '', 7.00, '01:30PM - 03:0OPM', 2, NULL, 'Bank Rakyat', 1, '2023-07-09 14:49:59', 0, NULL, 78, NULL, NULL, 1),
(2, 3, 'Extra peanut', 4.00, '01:30PM - 03:0OPM', NULL, 'Ali', NULL, 1, '2023-07-11 16:52:07', 1, '23445678', 79, NULL, NULL, 1),
(7, 3, '', 12.80, '10:30AM - 12:0OPM', 1, NULL, 'MISC/ BSN', 2, '2023-07-13 10:52:53', 1, NULL, 80, NULL, NULL, 1),
(6, 3, 'More mayonnaise', 4.50, '12:00PM - 01:3OPM', 1, NULL, 'Vmall/ Uinn/ Maybank', 1, '2023-07-16 16:53:39', 1, NULL, 81, '[\'Scrambled Egg\']', 'Mayonnaise', 1),
(8, 4, '', 1.50, '03:00PM - 04:3OPM', NULL, 'CC123556', NULL, 1, '2023-07-18 17:24:18', 1, '123987654', 82, NULL, NULL, 1),
(1, 5, '', 5.00, '10:30AM - 12:0OPM', 1, NULL, 'TM', 1, '2023-07-27 22:54:10', 0, NULL, 84, NULL, NULL, 0),
(7, 5, '', 6.90, '10:30AM - 12:0OPM', 1, NULL, 'Petronas', 1, '2023-07-26 23:31:06', 0, NULL, 85, NULL, NULL, 0),
(1, 4, '', 8.00, '10:30AM - 12:0OPM', NULL, 'Vicky', NULL, 2, '2023-07-27 20:50:43', 1, '122737823', 86, NULL, NULL, NULL),
(2, 4, '', 8.00, '10:30AM - 12:0OPM', NULL, 'Vicky', NULL, 2, '2023-07-27 20:53:56', 1, '122737823', 87, NULL, NULL, NULL),
(8, 3, '', 3.00, '10:30AM - 12:0OPM', NULL, 'Choong Hui Kei', NULL, 2, '2024-11-29 17:08:53', 1, '0173312618', 88, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `purchaseorder`
--
ALTER TABLE `purchaseorder`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `userid` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `purchaseorder`
--
ALTER TABLE `purchaseorder`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `purchaseorder`
--
ALTER TABLE `purchaseorder`
  ADD CONSTRAINT `userid` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
