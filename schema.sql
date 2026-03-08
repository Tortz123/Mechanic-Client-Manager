CREATE TABLE mechanics (
id SERIAL,
userName VARCHAR(50) NOT NULL,
email VARCHAR(50) NULL,
passwordHash VARCHAR(255) NULL,
PRIMARY KEY(id)
);


CREATE TABLE clients (
id SERIAL,
userName VARCHAR(50) NOT NULL,
userId INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY (userId) REFERENCES mechanics (id)
);




CREATE TABLE cars (
id SERIAL,
brand VARCHAR(50) NOT NULL,
model VARCHAR(50) NOT NULL,
year INT NOT NULL,
vin VARCHAR(50) NOT NULL,
clientId INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY(clientId) REFERENCES clients (id)
);

 
CREATE TABLE serviceRecords (
id SERIAL,
serviceType VARCHAR(100) NOT NULL,
notes VARCHAR(1000) NULL,
kilometers INT NOT NULL,
serviceDate DATE NOT NULL,
carId INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY (carId) REFERENCES cars (id)
);
