### Bamazon.com - An online customer storefront and inventory management system.
***

- Author:  Darrell Freeman
- Date:  05/23/17
- Tools Used:  Node.js, MySQL, Javascript, NPM's (inquirer, mysql, cli-table)

Bamazon.com is an interactive shopping app that uses Node.js and MySQL to package the customer shopping experience together with an inventory management system in one place.

#### Bamazon Customer Storefront - intialized using the command `node bamazonCustomer.js` at the terminal.
***

Customers can view the current inventory and select items that they wish to purchase.  An order is completed for any purchases made if sufficient stock exists .  The user is notified if there is not enough of an item in stock to complete the order, and is prompted to enter a valid purchase quantity.  If an order is completed, the number of items ordered is removed from and reflected after another inventory check.  This is also confirmed within the MySQL database. 


![Bamazon Store](images/cust1.png)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Initial Customer View
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    MySQL Source Database

In this example, we are going to place an order for 14 Playstation 4's.  So we simply enter the ID number of the item (6) that we are ordering, and then how many we want (14.  We're having a party and need stations).


![Bamazon Store](images/cust2.png)

And after our order has been placed, we re-run the program and refresh the MySQL database.  Both reflect correctly that we have 4 units left over.  

![Bamazon Store](images/cust3.png)

#### Bamazon Inventory Management (Manager Level) - intialized using the command `node bamazonManager.js`.
***


Bamazon Storefront managers can access and manage the inventory levels at any time.  Upon intializing the program, a list of choices is presented that the user can scroll through and choose.  The available choices are:

##### View Product for Sale:

- This choice simply displays the current product list with the relevant information.  

##### View Low Inventory:

- Identifies and displays any current inventory product running low (Defined in this instance as count less than 5).  In the images below, this consists of items 12 (Ladder) and 13 (Sofa)

![Bamazon Inventory System](images/cust1.png)

Choosing the "View Low Inventory" option will tell us this

![Bamazon Inventory System](images/man1.png)

##### Add Inventory:

- This allows the manager to add inventory to any item on the current inventory list.  For example, to add 5 more ladders to stock: 

![Bamazon Inventory System](images/man2.png)

This increases our stock to 9 total, as indicated in our refreshed inventory and MySQL tables.

![Bamazon Inventory System](images/man3.png)

##### Add New Product:

- This allows for addition of new items to the inventory table.  Upon initialization, the user walks through a series of prompts for the necessary information, as shown below.  In this example, a new Ping Pong Table item is added to the Home and Garden department, with 8 on hand and at a price of 349.99 each.

![Bamazon Inventory System](images/man4.png)

Once the information is entered the changes can be verified within the Node.js and MySQL tables.

![Bamazon Inventory System](images/man5.png)

