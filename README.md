### Bamazon.com - An online store inventory management system.
***

- Author:  Darrell Freeman
- Date:  05/23/17
- Tools Used:  Node.js, MySQL, Javascript, NPM's (inquirer, mysql, cli-table)

Bamazon.com is a an interactive shopping app that uses Node.js and MySQL to package the customer shopping experience together with an inventory management system in one place.

#### Bamazon Customer Storefront - intialized using the command `node bamazonCustomer.js` at the terminal.
***

Customers can view the current inventory and select items that they wish to purchase.  An order is completed for any purchases made if sufficient stock exists .  The user is notified if there is not enough of an item in stock to complete the order, and is prompted to enter a valid purchase quantity.  If an order is completed, the number of items ordered is removed from and reflected after another inventory check.  This is also confirmed within the MySQL database. 

![Bamazon Store](images/cust1.png)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Initial Customer View
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MySQL Source Database"

