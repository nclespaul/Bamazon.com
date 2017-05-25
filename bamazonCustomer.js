const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

// ******************************  Connect to the mysql database ******************************* //
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "nclespaul",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
});

// ************************************* Main program ****************************************** //

// ********************** Customer View (Minimum Requirements) Portion ************************* //
// query the database for all items for sale.
var order = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        var table = new Table({
                head: ['Item ID', 'Product Name', 'Department', 'Price (each)', 'Quantity Available']
        });
        // Pushes the inventory into a table and displays the result. 
            console.log("\n\nInventory list shown below is is updated daily.  Check back tomorrow for more savings!");
            for (var i = 0; i < res.length; i++) {
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
            }
            console.log(table.toString());
            console.log("\n");
        // Prompt the user to provide the information for their order.
            var orderForm = function () {
                inquirer.prompt([{
                    name: "Id",
                    type: "input",
                    message: "Please enter the Item ID number from the table for the item you wish to order:  ",
                    validate: function(value) {
                        if (value < 1 || value > res.length + 1) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }, {
                    name: "quantity",
                    type: "input",
                    message: "Please enter the quantity you would like to purchase:  ",
                    validate: function(value) {
                        if (isNaN(value) == true || value > res.stock_quantity + 1) {
                            console.log("Invalid selection.");
                        } else {
                            return true;
                        }
                    }
                }]).then(function(answer) {
                    var buyId = answer.Id - 1;
                    var buyProduct = res[buyId];
                    var buyProductName = res[buyId].product_name;
                    var buyQuantity = answer.quantity;
                    if (buyQuantity >= buyProduct.stock_quantity) {
                        console.log("  Sorry, there are only " + buyProduct.stock_quantity + " of these available.");
                        orderForm();
                    } else {
                        var orderTotal = buyQuantity * res[buyId].price;
                        console.log("  The total price for " + buyQuantity + " " + buyProductName + "'s is $" + orderTotal.toFixed(2));
                        console.log("  Thank you, your order has been placed.")
                        connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: buyProduct.stock_quantity - buyQuantity 
                        }, {
                            item_id: res[buyId].item_id
                        }]) 
                    };
                    process.exit();
                })
            }    
        orderForm();
    });
}      

order();  // End of the Minimum Requirements portion.



