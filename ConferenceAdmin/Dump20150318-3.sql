-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: conferenceadmin
-- ------------------------------------------------------
-- Server version	5.6.22-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address` (
  `addressID` bigint(20) NOT NULL AUTO_INCREMENT,
  `line1` varchar(80) DEFAULT NULL,
  `line2` varchar(80) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `zipcode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`addressID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'1f','1f','1f','1f','country','1f'),(2,'hgh','ghg','hg','gh','g','h');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authorizationsubmitted`
--

DROP TABLE IF EXISTS `authorizationsubmitted`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authorizationsubmitted` (
  `authorizationSubmittedID` int(11) NOT NULL AUTO_INCREMENT,
  `minorID` bigint(20) NOT NULL,
  `documentFile` varchar(2000) NOT NULL,
  `documentName` varchar(45) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`authorizationSubmittedID`),
  KEY `userID_idx` (`minorID`),
  CONSTRAINT `minorID` FOREIGN KEY (`minorID`) REFERENCES `minors` (`minorsID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authorizationsubmitted`
--

LOCK TABLES `authorizationsubmitted` WRITE;
/*!40000 ALTER TABLE `authorizationsubmitted` DISABLE KEYS */;
/*!40000 ALTER TABLE `authorizationsubmitted` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `claims`
--

DROP TABLE IF EXISTS `claims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `claims` (
  `claimsID` bigint(20) NOT NULL AUTO_INCREMENT,
  `privilegesID` int(11) DEFAULT NULL,
  `userID` bigint(20) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`claimsID`),
  KEY `privilegesID_idx` (`privilegesID`),
  KEY `userIDClaim` (`userID`),
  CONSTRAINT `privilegesID` FOREIGN KEY (`privilegesID`) REFERENCES `privileges` (`privilegesID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userIDClaim` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `claims`
--

LOCK TABLES `claims` WRITE;
/*!40000 ALTER TABLE `claims` DISABLE KEYS */;
/*!40000 ALTER TABLE `claims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `committeeinterface`
--

DROP TABLE IF EXISTS `committeeinterface`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `committeeinterface` (
  `committeID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `affiliation` varchar(45) NOT NULL,
  `description` varchar(500) NOT NULL,
  PRIMARY KEY (`committeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `committeeinterface`
--

LOCK TABLES `committeeinterface` WRITE;
/*!40000 ALTER TABLE `committeeinterface` DISABLE KEYS */;
/*!40000 ALTER TABLE `committeeinterface` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companion`
--

DROP TABLE IF EXISTS `companion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companion` (
  `companionID` bigint(20) NOT NULL AUTO_INCREMENT,
  `userID` bigint(20) NOT NULL,
  `companionKey` varchar(45) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`companionID`),
  KEY `userID_idx` (`userID`),
  CONSTRAINT `userCompanionID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companion`
--

LOCK TABLES `companion` WRITE;
/*!40000 ALTER TABLE `companion` DISABLE KEYS */;
INSERT INTO `companion` VALUES (1,3,'kjjk',NULL),(2,4,'jkjk',NULL);
/*!40000 ALTER TABLE `companion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companionminor`
--

DROP TABLE IF EXISTS `companionminor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companionminor` (
  `companionminorID` int(11) NOT NULL AUTO_INCREMENT,
  `minorID` bigint(20) NOT NULL,
  `companionID` bigint(20) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`companionminorID`),
  KEY `minorID_idx` (`minorID`),
  KEY `companionID_idx` (`companionID`),
  CONSTRAINT `companionID` FOREIGN KEY (`companionID`) REFERENCES `companion` (`companionID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `minorcompanionID` FOREIGN KEY (`minorID`) REFERENCES `minors` (`minorsID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companionminor`
--

LOCK TABLES `companionminor` WRITE;
/*!40000 ALTER TABLE `companionminor` DISABLE KEYS */;
/*!40000 ALTER TABLE `companionminor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complementarykey`
--

DROP TABLE IF EXISTS `complementarykey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `complementarykey` (
  `complementarykeyID` bigint(20) NOT NULL AUTO_INCREMENT,
  `sponsorID` bigint(20) NOT NULL,
  `isUsed` tinyint(1) DEFAULT '1',
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`complementarykeyID`),
  KEY `sponsorID_idx` (`sponsorID`),
  CONSTRAINT `sponsorID` FOREIGN KEY (`sponsorID`) REFERENCES `sponsor` (`sponsorID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complementarykey`
--

LOCK TABLES `complementarykey` WRITE;
/*!40000 ALTER TABLE `complementarykey` DISABLE KEYS */;
/*!40000 ALTER TABLE `complementarykey` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentssubmitted`
--

DROP TABLE IF EXISTS `documentssubmitted`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documentssubmitted` (
  `documentssubmittedID` bigint(20) NOT NULL AUTO_INCREMENT,
  `submissionID` bigint(20) NOT NULL,
  `document` varchar(2000) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`documentssubmittedID`),
  KEY `submisisonID_idx` (`submissionID`),
  CONSTRAINT `submisisonID` FOREIGN KEY (`submissionID`) REFERENCES `submissions` (`submissionID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentssubmitted`
--

LOCK TABLES `documentssubmitted` WRITE;
/*!40000 ALTER TABLE `documentssubmitted` DISABLE KEYS */;
/*!40000 ALTER TABLE `documentssubmitted` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluationsubmitted`
--

DROP TABLE IF EXISTS `evaluationsubmitted`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evaluationsubmitted` (
  `evaluationsubmittedID` bigint(20) NOT NULL AUTO_INCREMENT,
  `evaluatiorSubmissionID` bigint(20) NOT NULL,
  `evaluationFile` varchar(2000) NOT NULL,
  `score` int(11) DEFAULT '0',
  `publicFeedback` varchar(1000) DEFAULT NULL,
  `privateFeedback` varchar(1000) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`evaluationsubmittedID`),
  KEY `evaluatorsubmissionID_idx` (`evaluatiorSubmissionID`),
  CONSTRAINT `evaluatorsubmissionID` FOREIGN KEY (`evaluatiorSubmissionID`) REFERENCES `evaluatiorsubmission` (`evaluationsubmissionID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluationsubmitted`
--

LOCK TABLES `evaluationsubmitted` WRITE;
/*!40000 ALTER TABLE `evaluationsubmitted` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluationsubmitted` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluatiorsubmission`
--

DROP TABLE IF EXISTS `evaluatiorsubmission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evaluatiorsubmission` (
  `evaluationsubmissionID` bigint(20) NOT NULL,
  `evaluatorID` bigint(20) NOT NULL,
  `submissionID` bigint(20) NOT NULL,
  `statusEvaluation` varchar(45) DEFAULT 'Pending',
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`evaluationsubmissionID`),
  KEY `evaluatorID_idx` (`evaluatorID`),
  KEY `submissionID_idx` (`submissionID`),
  CONSTRAINT `evaluatorID` FOREIGN KEY (`evaluatorID`) REFERENCES `evaluators` (`evaluatorsID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `submissionID` FOREIGN KEY (`submissionID`) REFERENCES `submissions` (`submissionID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluatiorsubmission`
--

LOCK TABLES `evaluatiorsubmission` WRITE;
/*!40000 ALTER TABLE `evaluatiorsubmission` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluatiorsubmission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluators`
--

DROP TABLE IF EXISTS `evaluators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evaluators` (
  `evaluatorsID` bigint(20) NOT NULL AUTO_INCREMENT,
  `userID` bigint(20) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`evaluatorsID`),
  KEY `userID_idx` (`userID`),
  CONSTRAINT `userEvaluatorID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluators`
--

LOCK TABLES `evaluators` WRITE;
/*!40000 ALTER TABLE `evaluators` DISABLE KEYS */;
INSERT INTO `evaluators` VALUES (1,4,0);
/*!40000 ALTER TABLE `evaluators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interfaceinformation`
--

DROP TABLE IF EXISTS `interfaceinformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interfaceinformation` (
  `interfaceID` int(11) NOT NULL AUTO_INCREMENT,
  `attribute` varchar(45) NOT NULL,
  `content` varchar(1000) NOT NULL,
  PRIMARY KEY (`interfaceID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interfaceinformation`
--

LOCK TABLES `interfaceinformation` WRITE;
/*!40000 ALTER TABLE `interfaceinformation` DISABLE KEYS */;
/*!40000 ALTER TABLE `interfaceinformation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `memberships`
--

DROP TABLE IF EXISTS `memberships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `memberships` (
  `membershipID` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `emailConfirmation` tinyint(1) DEFAULT '0',
  `confirmationKey` varchar(200) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`membershipID`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memberships`
--

LOCK TABLES `memberships` WRITE;
/*!40000 ALTER TABLE `memberships` DISABLE KEYS */;
INSERT INTO `memberships` VALUES (1,'maria@','maria',0,NULL,NULL),(2,'minor@','minor',0,NULL,NULL),(10,'companion@','companion',0,NULL,NULL),(11,'evaluator@','evaluator',0,NULL,NULL),(12,'participant@','participant',0,NULL,NULL),(13,'heidi@','heidi',0,NULL,NULL),(14,'randy@','randy',0,NULL,NULL),(15,'jai@','jai',0,NULL,NULL),(16,'finance@','finance',0,NULL,NULL),(17,'committee@','committee',0,NULL,NULL),(18,'eva@','eva',0,NULL,NULL),(19,'eva','eva',0,NULL,NULL);
/*!40000 ALTER TABLE `memberships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `minors`
--

DROP TABLE IF EXISTS `minors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `minors` (
  `minorsID` bigint(20) NOT NULL AUTO_INCREMENT,
  `userID` bigint(20) NOT NULL,
  `authorizationStatus` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`minorsID`),
  KEY `userID_idx` (`userID`),
  CONSTRAINT `userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `minors`
--

LOCK TABLES `minors` WRITE;
/*!40000 ALTER TABLE `minors` DISABLE KEYS */;
INSERT INTO `minors` VALUES (1,1,0,0);
/*!40000 ALTER TABLE `minors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `panels`
--

DROP TABLE IF EXISTS `panels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `panels` (
  `panelsID` bigint(20) NOT NULL AUTO_INCREMENT,
  `submissionID` bigint(20) NOT NULL,
  `panelistNames` varchar(500) NOT NULL,
  `plan` varchar(500) DEFAULT NULL,
  `guideQuestion` varchar(1000) DEFAULT NULL,
  `formatDescription` varchar(500) DEFAULT NULL,
  `necessaryEquipment` varchar(500) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`panelsID`),
  KEY `submissionID_idx` (`submissionID`),
  CONSTRAINT `submissionPanelID` FOREIGN KEY (`submissionID`) REFERENCES `submissions` (`submissionID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `panels`
--

LOCK TABLES `panels` WRITE;
/*!40000 ALTER TABLE `panels` DISABLE KEYS */;
/*!40000 ALTER TABLE `panels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment` (
  `paymentID` bigint(20) NOT NULL AUTO_INCREMENT,
  `paymentTypeID` int(11) NOT NULL,
  `creationDate` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`paymentID`),
  KEY `paymentTypeID_idx` (`paymentTypeID`),
  CONSTRAINT `paymentTypeID` FOREIGN KEY (`paymentTypeID`) REFERENCES `paymenttype` (`paymentTypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,1,NULL,NULL),(2,1,NULL,NULL);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentbill`
--

DROP TABLE IF EXISTS `paymentbill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paymentbill` (
  `paymentBillID` bigint(20) NOT NULL AUTO_INCREMENT,
  `paymentID` bigint(20) NOT NULL,
  `addressID` bigint(20) DEFAULT NULL,
  `transactionid` varchar(45) NOT NULL DEFAULT '0',
  `AmountPaid` double NOT NULL,
  `methodOfPayment` varchar(45) NOT NULL,
  `creditCardNumber` varchar(45) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `cardExpirationDate` date DEFAULT NULL,
  PRIMARY KEY (`paymentBillID`),
  KEY `paymentID_idx` (`paymentID`),
  KEY `addressID_idx` (`addressID`),
  CONSTRAINT `addressID` FOREIGN KEY (`addressID`) REFERENCES `address` (`addressID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `paymentID` FOREIGN KEY (`paymentID`) REFERENCES `payment` (`paymentID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentbill`
--

LOCK TABLES `paymentbill` WRITE;
/*!40000 ALTER TABLE `paymentbill` DISABLE KEYS */;
INSERT INTO `paymentbill` VALUES (1,1,NULL,'1',1,'gfdg','1',NULL,NULL),(2,2,NULL,'1',150,'hjh','353454534',NULL,NULL);
/*!40000 ALTER TABLE `paymentbill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentcomplementary`
--

DROP TABLE IF EXISTS `paymentcomplementary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paymentcomplementary` (
  `paymentcomplementaryID` bigint(20) NOT NULL AUTO_INCREMENT,
  `paymentID` bigint(20) NOT NULL,
  `complementaryKeyID` bigint(20) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`paymentcomplementaryID`),
  KEY `paymentID_idx` (`paymentID`),
  CONSTRAINT `complementaryKeyID` FOREIGN KEY (`paymentcomplementaryID`) REFERENCES `complementarykey` (`complementarykeyID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `paymentComplementaryID` FOREIGN KEY (`paymentID`) REFERENCES `payment` (`paymentID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentcomplementary`
--

LOCK TABLES `paymentcomplementary` WRITE;
/*!40000 ALTER TABLE `paymentcomplementary` DISABLE KEYS */;
/*!40000 ALTER TABLE `paymentcomplementary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymenttype`
--

DROP TABLE IF EXISTS `paymenttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paymenttype` (
  `paymentTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`paymentTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymenttype`
--

LOCK TABLES `paymenttype` WRITE;
/*!40000 ALTER TABLE `paymenttype` DISABLE KEYS */;
INSERT INTO `paymenttype` VALUES (1,'Bill'),(2,'Complementary');
/*!40000 ALTER TABLE `paymenttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privileges`
--

DROP TABLE IF EXISTS `privileges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `privileges` (
  `privilegesID` int(11) NOT NULL AUTO_INCREMENT,
  `privilegestType` varchar(45) NOT NULL,
  PRIMARY KEY (`privilegesID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privileges`
--

LOCK TABLES `privileges` WRITE;
/*!40000 ALTER TABLE `privileges` DISABLE KEYS */;
INSERT INTO `privileges` VALUES (1,'Admin'),(2,'Finance'),(3,'CommitteEvaluator'),(4,'Evaluator');
/*!40000 ALTER TABLE `privileges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registration`
--

DROP TABLE IF EXISTS `registration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registration` (
  `registrationID` bigint(20) NOT NULL AUTO_INCREMENT,
  `userID` bigint(20) NOT NULL,
  `paymentID` bigint(20) NOT NULL,
  `date1` tinyint(1) DEFAULT '0',
  `date2` tinyint(1) DEFAULT '0',
  `date3` tinyint(1) DEFAULT '0',
  `byAdmin` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  `note` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`registrationID`),
  KEY `userID_idx` (`userID`),
  KEY `paymentID_idx` (`paymentID`),
  CONSTRAINT `paymentIDRegistration` FOREIGN KEY (`paymentID`) REFERENCES `payment` (`paymentID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userIDRegister` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registration`
--

LOCK TABLES `registration` WRITE;
/*!40000 ALTER TABLE `registration` DISABLE KEYS */;
/*!40000 ALTER TABLE `registration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sponsor`
--

DROP TABLE IF EXISTS `sponsor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sponsor` (
  `sponsorID` bigint(20) NOT NULL AUTO_INCREMENT,
  `paymentID` bigint(20) NOT NULL,
  `sponsorType` int(11) NOT NULL,
  `addressID` bigint(20) DEFAULT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `company` varchar(45) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `logo` varchar(45) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`sponsorID`),
  KEY `sponsorTypeID_idx` (`sponsorType`),
  KEY `addressID_idx` (`addressID`),
  KEY `paymentID_idx` (`paymentID`),
  CONSTRAINT `SponsoraddressID` FOREIGN KEY (`addressID`) REFERENCES `address` (`addressID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `payment` FOREIGN KEY (`paymentID`) REFERENCES `payment` (`paymentID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `sponsorTypeID` FOREIGN KEY (`sponsorType`) REFERENCES `sponsortype` (`sponsortypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COMMENT='			';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sponsor`
--

LOCK TABLES `sponsor` WRITE;
/*!40000 ALTER TABLE `sponsor` DISABLE KEYS */;
INSERT INTO `sponsor` VALUES (1,1,1,1,'spon122hffff','1h','hfgdh','1f','1f','1f',NULL,NULL),(2,2,1,2,'spon2dsdss','De La Torredddd','Student','UPRM','7876075141','ANGEL@UPR.ED',NULL,NULL);
/*!40000 ALTER TABLE `sponsor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sponsortype`
--

DROP TABLE IF EXISTS `sponsortype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sponsortype` (
  `sponsortypeID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `amount` double NOT NULL,
  `benefit1` varchar(200) DEFAULT NULL,
  `benefit2` varchar(200) DEFAULT NULL,
  `benefit3` varchar(200) DEFAULT NULL,
  `benefit4` varchar(200) DEFAULT NULL,
  `benefit5` varchar(200) DEFAULT NULL,
  `benefit6` varchar(200) DEFAULT NULL,
  `benefit7` varchar(200) DEFAULT NULL,
  `benefit8` varchar(200) DEFAULT NULL,
  `benefit9` varchar(200) DEFAULT NULL,
  `benefit10` varchar(200) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`sponsortypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sponsortype`
--

LOCK TABLES `sponsortype` WRITE;
/*!40000 ALTER TABLE `sponsortype` DISABLE KEYS */;
INSERT INTO `sponsortype` VALUES (1,'Platinium',5000,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(2,'Gold',3000,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(3,'Silver',1500,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(4,'Bronze',500,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(5,'Supporter',100,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `sponsortype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submissions`
--

DROP TABLE IF EXISTS `submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `submissions` (
  `submissionID` bigint(20) NOT NULL AUTO_INCREMENT,
  `userID` bigint(20) NOT NULL,
  `topicID` int(11) NOT NULL,
  `submissionTypeID` int(11) NOT NULL,
  `submissionAbstract` varchar(2000) DEFAULT '0',
  `title` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT 'Pending',
  `creationDate` datetime NOT NULL,
  `byAdmin` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`submissionID`),
  KEY `submissionTypeID_idx` (`submissionTypeID`),
  KEY `topicID_idx` (`topicID`),
  KEY `userID_idx` (`userID`),
  CONSTRAINT `submissionType` FOREIGN KEY (`submissionTypeID`) REFERENCES `submissiontype` (`submissiontypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `topicCategoryID` FOREIGN KEY (`topicID`) REFERENCES `topiccategory` (`topiccategoryID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userIDSumission` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submissions`
--

LOCK TABLES `submissions` WRITE;
/*!40000 ALTER TABLE `submissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submissiontype`
--

DROP TABLE IF EXISTS `submissiontype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `submissiontype` (
  `submissiontypeID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(500) NOT NULL,
  PRIMARY KEY (`submissiontypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submissiontype`
--

LOCK TABLES `submissiontype` WRITE;
/*!40000 ALTER TABLE `submissiontype` DISABLE KEYS */;
/*!40000 ALTER TABLE `submissiontype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templates`
--

DROP TABLE IF EXISTS `templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `templates` (
  `templateID` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `document` varchar(2000) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`templateID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templates`
--

LOCK TABLES `templates` WRITE;
/*!40000 ALTER TABLE `templates` DISABLE KEYS */;
/*!40000 ALTER TABLE `templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templatesubmission`
--

DROP TABLE IF EXISTS `templatesubmission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `templatesubmission` (
  `templatesubmissionID` int(11) NOT NULL AUTO_INCREMENT,
  `templateID` bigint(20) NOT NULL,
  `submissionID` bigint(20) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`templatesubmissionID`),
  KEY `submissionID_idx` (`submissionID`),
  KEY `templateID_idx` (`templateID`),
  CONSTRAINT `submissionTemplateID` FOREIGN KEY (`submissionID`) REFERENCES `submissions` (`submissionID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `templateAssigniedID` FOREIGN KEY (`templateID`) REFERENCES `templates` (`templateID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templatesubmission`
--

LOCK TABLES `templatesubmission` WRITE;
/*!40000 ALTER TABLE `templatesubmission` DISABLE KEYS */;
/*!40000 ALTER TABLE `templatesubmission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topiccategory`
--

DROP TABLE IF EXISTS `topiccategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `topiccategory` (
  `topiccategoryID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`topiccategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topiccategory`
--

LOCK TABLES `topiccategory` WRITE;
/*!40000 ALTER TABLE `topiccategory` DISABLE KEYS */;
INSERT INTO `topiccategory` VALUES (1,'lola',0),(2,'juan',0),(3,'loka',0);
/*!40000 ALTER TABLE `topiccategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userID` bigint(20) NOT NULL AUTO_INCREMENT,
  `membershipID` bigint(20) NOT NULL,
  `userTypeID` int(11) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `affiliationName` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `addressID` bigint(20) NOT NULL,
  `userFax` varchar(45) DEFAULT NULL,
  `registrationStatus` varchar(45) DEFAULT NULL,
  `hasApplied` tinyint(1) DEFAULT '0',
  `acceptanceStatus` varchar(45) DEFAULT NULL,
  `isEvaluator` varchar(45) NOT NULL,
  `deleted` smallint(1) DEFAULT '0',
  PRIMARY KEY (`userID`),
  KEY `addressID_idx` (`addressID`),
  KEY `usertypeID_idx` (`userTypeID`),
  KEY `membershipID_idx` (`membershipID`),
  CONSTRAINT `addressIDuser` FOREIGN KEY (`addressID`) REFERENCES `address` (`addressID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `membershipID` FOREIGN KEY (`membershipID`) REFERENCES `memberships` (`membershipID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userTypeID` FOREIGN KEY (`userTypeID`) REFERENCES `usertype` (`userTypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,2,1,'juan','rivera','dsf','hg','45454',1,'543','0',1,'1','',0),(3,10,6,'jijki','jkjk','kjj','jkj','kjk',1,'j','1',0,'0','',0),(4,11,2,'rtrrtrt','yt','y','t','tyt',1,NULL,'1',0,'1','',0),(5,12,2,'uyyu','yuyu','uyu','uyu','yuyu',1,'yu','0',0,'0','',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertype`
--

DROP TABLE IF EXISTS `usertype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usertype` (
  `userTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `userTypeName` varchar(45) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `registrationCost` double DEFAULT '0',
  `registrationLateFee` double DEFAULT '0',
  PRIMARY KEY (`userTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertype`
--

LOCK TABLES `usertype` WRITE;
/*!40000 ALTER TABLE `usertype` DISABLE KEYS */;
INSERT INTO `usertype` VALUES (1,'High School Student','wew',7,10),(2,'Undergraduate Student','wew',5,5),(3,'Graduate Student','ew',5,5),(4,'Professional Industry','wew',5,5),(5,'Professional Academia','eww',5,5),(6,'Companion','kjk',6,6);
/*!40000 ALTER TABLE `usertype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workshops`
--

DROP TABLE IF EXISTS `workshops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workshops` (
  `workshopID` int(11) NOT NULL AUTO_INCREMENT,
  `submissionID` bigint(20) NOT NULL,
  `duration` varchar(45) DEFAULT NULL,
  `delivery` varchar(45) DEFAULT NULL,
  `plan` varchar(45) DEFAULT NULL,
  `necessary equipment` varchar(100) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`workshopID`),
  KEY `submissionID_idx` (`submissionID`),
  CONSTRAINT `submissionWorkshopID` FOREIGN KEY (`submissionID`) REFERENCES `submissions` (`submissionID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workshops`
--

LOCK TABLES `workshops` WRITE;
/*!40000 ALTER TABLE `workshops` DISABLE KEYS */;
/*!40000 ALTER TABLE `workshops` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-03-19  0:58:14