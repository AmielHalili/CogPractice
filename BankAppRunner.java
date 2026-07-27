import java.util.*;

public class BankAppRunner {
   static Scanner sc = new Scanner(System.in);
   static Map<String, User> map = new HashMap<>();

   public BankAppRunner() {
   }

   public static void main(String[] logincred) {
      System.out.println("Welcome to our bank");

      boolean overallLoopFlag =true;
      while(overallLoopFlag){
        System.out.println("Do you want to login or not? Y/N");

        String choice = sc.nextLine();
        if(choice.equalsIgnoreCase("Y")){
          redirect();
          overallLoopFlag = false;
        }else if(choice.equalsIgnoreCase("N")){
            overallLoopFlag = false;
            System.out.println("Thank you for using our bank application. Goodbye!");
        }else{
            System.out.println("Invalid choice. Please enter Y or N.");
        }
      }


      // printMessage("Welcome " + mylogin());
   }

   // redirect console user to either admin or customer page based on their login credentials
   private static void redirect() {
      System.out.println("Redirecting to the appropriate page...");
        User user = mylogin();
        if (user != null) {
            if (user.getUsername().equals("admin")) {
                adminPage();
            } else {
                customerPage();
            }
        }
   }

   // loginss --------------------------------
    private static User mylogin() {
        System.out.println("Please enter username and password separated by space");
        String inputLogin = sc.nextLine();
        String[] logincred = inputLogin.split(" ");
        String username = logincred[0];
        String password = logincred[1];

        User user = (User) map.get(username);
        if(user !=null && user.getPassword().equals(password)) {
            System.out.println("Login successful");
            return user;
        } else {
            System.out.println("Invalid username or password");
            return null;
        }
        
    }

    // admin page
   private static void adminPage() {
      System.out.println("Welcome to the admin page");
      System.out.println("What would you like to do?");
      Scanner sc = new Scanner(System.in);
      System.out.println("1. View all users");
      System.out.println("2. Add a new user");
      System.out.println("3. Delete a user");
      System.out.println("4. Exit");

      switch (sc.nextInt()) {
         case 1:
            System.out.println("Viewing all users");
            break;
         case 2:
            System.out.println("Adding a new user");
            break;
         case 3:
            System.out.println("Deleting a user");
            break;
         case 4:
            System.out.println("Exiting");
            break;
         default:
            System.out.println("Invalid choice");
      }
   }

   // customer page
   private static void customerPage() {
      System.out.println("Welcome to the customer page");
      System.out.println("What would you like to do?");
      Scanner sc = new Scanner(System.in);
      System.out.println("1. View account balance");
      System.out.println("2. Deposit money");
      System.out.println("3. Withdraw money");
      System.out.println("4. Transfer money");
      System.out.println("5. Exit");
      switch (sc.nextInt()) {
         case 1:
            System.out.println("Viewing account balance");
            ViewAccountBalance();
            break;
         case 2:
            System.out.println("Depositing money");
            break;
         case 3:
            System.out.println("Withdrawing money");
            break;
         case 4:
            System.out.println("Transferring money");
            break;
         case 5:
            System.out.println("Exiting");
            break;
         default:
            System.out.println("Invalid choice");
      }

   }
   

   // view acc balance, still need to integrate with account class and user class to get the actual balance of the user
   private static void ViewAccountBalance() {
      System.out.println("Your account balance is: $" + 1000.00);
   }

   

   

   
   
   static {
      map.put("admin", new User("admin", "admin123"));
      map.put("user1", new User("user1", "pass1"));
      map.put("user2", new User("user2", "pass2"));
      map.put("amiel", new User("amiel", "halili"));
   }
}



//class user
class User {
   private String username;
   private String password;

   public User(String username, String password) {
      this.username = username;
      this.password = password;
   }

   public String getUsername() {
      return this.username;
   }

   public String getPassword() {
      return this.password;
   }
}

//class admin extrends user
class Admin extends User {
   public Admin(String username, String password) {
      super(username, password);
   }
}
//class customer extends user
class Customer extends User {
   public Customer(String username, String password) {
      super(username, password);
   }
}



//abstract class Account
abstract class Account {
   private String accountNumber;
   private double balance;

   public Account(String accountNumber, double balance) {
      this.accountNumber = accountNumber;
      this.balance = balance;
   }

   private String getAccountNumber() {
      return this.accountNumber;
   }

   private double getBalance() {
      return this.balance;
   }

   private void setBalance(double balance) {
      this.balance = balance;
   }
}
//checkingsaccount extends account
class CheckingAccount extends Account {
    public CheckingAccount(String accountNumber, double balance) {
        super(accountNumber, balance);
    }
    }

//savings account extrewnds account
class SavingsAccount extends Account {
    public SavingsAccount(String accountNumber, double balance) {
        super(accountNumber, balance);
    }
}



//interfact AccountOperations: printInterestRate(), deposit, withdraw, transfer.
//SavingsAccount always gives higher itnerst rate