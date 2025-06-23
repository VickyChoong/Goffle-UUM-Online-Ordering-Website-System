-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 23, 2025 at 08:10 AM
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
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `name`, `email`, `subject`, `message`, `status`) VALUES
(1, 'Order Inquiry', 'a@.com', 'Placing an Order', 'Hi Goffle, I would like to place an order for some delicious waffles. Could you please provide information on your menu options and how I can proceed with the order? Thanks!', 1),
(3, 'Feedback', '1', 'Experience at Your Shop', 'Hello Goffle, I recently visited your shop and had a wonderful experience trying your waffles and beverages. I just wanted to share my positive feedback with you. Keep up the great work!', 1),
(4, 'Question about Beverages', '123', 'Types of Beverages', 'Hi Goffle, I have a question about the types of beverages you serve at your shop. Could you please provide some information on the different drinks available? Thank you!', 1),
(5, 'Ice Cream Inquiry', 'derricksaw123@gmail.com', 'Availability of Ice Cream Flavors', 'Hi Goffle, I am interested in knowing the various flavors of ice cream you offer. Could you please provide some information on the available options? Thank you!', 0),
(6, 'Waffle Toppings', 'derricksaw123@gmail.com', 'Toppings for Waffles', 'Hello Goffle, I\'m planning to visit your shop and try your waffles. Can you tell me about the different toppings I can choose from? Looking forward to the tasty experience!', 1),
(7, 'Emily', 'emily@gmail.com', 'Special Event Inquiry', 'Hi Goffle, I\'m organizing a special event and would like to inquire about the possibility of having your waffles and ice cream as part of the menu. Can you provide details on pricing and availability for catering? Thank you!', 1),
(8, 'Ali', 'ali@hotmail.com', 'Allergen Information', 'Hello Goffle, I have some food allergies, and before I visit your shop, I\'d like to know if you have any allergen information available for your waffle and beverage offerings. Your response would be greatly appreciated. Thanks!', 1),
(9, 'Abu', 'abu@gmail.com', 'Feedback on Waffles', 'Hi Goffle, I visited your shop yesterday and tried your waffles. They were amazing! I just wanted to share my positive feedback and let you know how much I enjoyed them. Keep up the excellent work!', 0),
(10, 'Alex', 'alex@hotmail.com', 'Waffle Tasting Session', 'Dear Goffle, I\'m interested in trying out your waffles for an upcoming event. Could I schedule a waffle tasting session at your shop to explore the different flavors and options available? Looking forward to hearing from you.', 1),
(11, 'Steven', 'steven@gmail.com', 'Question about Open Hours', 'Hello Goffle, I\'m planning to visit your shop, but I\'m not sure about your operating hours. Can you please provide me with your opening and closing hours for weekdays and weekends? Thank you in advance!', 0),
(12, 'CHK', 'huikei.choong0327@gmail.com', 'Choc Waffle', 'Is it very sweet?', 0),
(13, 'Vicky', 'huikei.choong0327@gmail.com', 'Choc Waffle', 'is it will too sweet?', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
