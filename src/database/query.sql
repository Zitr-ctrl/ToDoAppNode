create database CRUDNode;

use CRUDNode;

create table Personas(
    id INT Auto_increment Primary Key,
    name VARCHAR(50) Not Null,
    LastName Varchar(50) Not Null,
    age Int Not Null

);

SELECT * FROM Personas;