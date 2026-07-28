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
                customerPage(user);
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
      System.out.println("1. View all users");
      System.out.println("2. Add a new user");
      System.out.println("3. Delete a user");
      System.out.println("4. Exit");

      int choice = readChoice();
      switch (choice) {
         case 1:
            System.out.println("Viewing all users");
            viewAllUsers();
            break;
         case 2:
            System.out.println("Adding a new user");
            addNewUser();
            break;
         case 3:
            System.out.println("Deleting a user");
            deleteUser();
            break;
         case 4:
            System.out.println("Exiting");
            break;
         default:
            System.out.println("Invalid choice");
      }
   }

   private static void viewAllUsers() {
      for (String username : map.keySet()) {
         System.out.println("- " + username);
      }
   }

   private static void addNewUser() {
      System.out.println("Enter a username for the new user:");
      String username = sc.nextLine().trim();
      if (map.containsKey(username)) {
         System.out.println("Username already exists.");
         return;
      }
      System.out.println("Enter a password for the new user:");
      String password = sc.nextLine().trim();
      System.out.println("Enter an initial deposit amount:");
      double initialBalance = readAmount();
      System.out.println("Choose account type: 1. Checking  2. Savings");
      int accountType = readChoice();

      User newUser = new User(username, password);
      Account newAccount = accountType == 1
            ? new CheckingAccount("CHK-" + username, initialBalance)
            : new SavingsAccount("SAV-" + username, initialBalance);
      newUser.setAccount(newAccount);
      map.put(username, newUser);
      System.out.println("User " + username + " added successfully.");
   }

   private static void deleteUser() {
      System.out.println("Enter the username of the user to delete:");
      String username = sc.nextLine().trim();
      if (username.equals("admin")) {
         System.out.println("Cannot delete the admin user.");
         return;
      }
      if (map.remove(username) != null) {
         System.out.println("User " + username + " deleted successfully.");
      } else {
         System.out.println("User not found.");
      }
   }

   // customer page
   private static void customerPage(User user) {
      System.out.println("Welcome to the customer page");
      System.out.println("What would you like to do?");
      System.out.println("1. View account balance");
      System.out.println("2. Deposit money");
      System.out.println("3. Withdraw money");
      System.out.println("4. Transfer money");
      System.out.println("5. Exit");

      Account account = user.getAccount();
      int choice = readChoice();
      switch (choice) {
         case 1:
            System.out.println("Viewing account balance");
            ViewAccountBalance(account);
            account.printInterestRate();
            break;
         case 2:
            System.out.println("Depositing money");
            System.out.println("Enter amount to deposit:");
            account.deposit(readAmount());
            break;
         case 3:
            System.out.println("Withdrawing money");
            System.out.println("Enter amount to withdraw:");
            account.withdraw(readAmount());
            break;
         case 4:
            System.out.println("Transferring money");
            System.out.println("Enter the username of the recipient:");
            String targetUsername = sc.nextLine().trim();
            User targetUser = map.get(targetUsername);
            if (targetUser == null || targetUser.getAccount() == null) {
               System.out.println("Recipient not found.");
               break;
            }
            System.out.println("Enter amount to transfer:");
            account.transfer(targetUser.getAccount(), readAmount());
            break;
         case 5:
            System.out.println("Exiting");
            break;
         default:
            System.out.println("Invalid choice");
      }
   }

   // view acc balance
   private static void ViewAccountBalance(Account account) {
      System.out.println("Your account balance is: $" + account.getBalance());
   }

   private static int readChoice() {
      try {
         return Integer.parseInt(sc.nextLine().trim());
      } catch (NumberFormatException e) {
         return -1;
      }
   }

   private static double readAmount() {
      try {
         return Double.parseDouble(sc.nextLine().trim());
      } catch (NumberFormatException e) {
         System.out.println("Invalid amount entered, defaulting to 0.");
         return 0;
      }
   }

   static {
      map.put("admin", new User("admin", "admin123"));

      User user1 = new User("user1", "pass1");
      user1.setAccount(new SavingsAccount("SAV-user1", 1000.00));
      map.put("user1", user1);

      User user2 = new User("user2", "pass2");
      user2.setAccount(new SavingsAccount("SAV-user2", 1000.00));
      map.put("user2", user2);

      User amiel = new User("amiel", "halili");
      amiel.setAccount(new SavingsAccount("SAV-amiel", 1000.00));
      map.put("amiel", amiel);
   }
}



//class user
class User {
   private String username;
   private String password;
   private Account account;

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

   public Account getAccount() {
      return this.account;
   }

   public void setAccount(Account account) {
      this.account = account;
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



//interface AccountOperations: printInterestRate(), deposit, withdraw, transfer.
interface AccountOperations {
   void printInterestRate();
   void deposit(double amount);
   void withdraw(double amount);
   void transfer(Account target, double amount);
}

//abstract class Account
abstract class Account implements AccountOperations {
   private String accountNumber;
   private double balance;

   public Account(String accountNumber, double balance) {
      this.accountNumber = accountNumber;
      this.balance = balance;
   }

   public String getAccountNumber() {
      return this.accountNumber;
   }

   public double getBalance() {
      return this.balance;
   }

   private void setBalance(double balance) {
      this.balance = balance;
   }

   // note: SavingsAccount always gives a higher interest rate than CheckingAccount
   public abstract double getInterestRate();

   @Override
   public void printInterestRate() {
      System.out.println("Interest rate: " + (getInterestRate() * 100) + "%");
   }

   @Override
   public void deposit(double amount) {
      if (amount <= 0) {
         System.out.println("Deposit amount must be positive.");
         return;
      }
      setBalance(getBalance() + amount);
      System.out.println("Deposited $" + amount + ". New balance: $" + getBalance());
   }

   @Override
   public void withdraw(double amount) {
      if (amount <= 0) {
         System.out.println("Withdrawal amount must be positive.");
         return;
      }
      if (amount > getBalance()) {
         System.out.println("Insufficient funds.");
         return;
      }
      setBalance(getBalance() - amount);
      System.out.println("Withdrew $" + amount + ". New balance: $" + getBalance());
   }

   @Override
   public void transfer(Account target, double amount) {
      if (target == null) {
         System.out.println("Target account does not exist.");
         return;
      }
      if (amount <= 0) {
         System.out.println("Transfer amount must be positive.");
         return;
      }
      if (amount > getBalance()) {
         System.out.println("Insufficient funds.");
         return;
      }
      this.withdraw(amount);
      target.deposit(amount);
      System.out.println("Transferred $" + amount + " to account " + target.getAccountNumber());
   }
}
//checkingsaccount extends account
class CheckingAccount extends Account {
    private static final double INTEREST_RATE = 0.01;

    public CheckingAccount(String accountNumber, double balance) {
        super(accountNumber, balance);
    }

    @Override
    public double getInterestRate() {
        return INTEREST_RATE;
    }
}

//savings account extrewnds account
class SavingsAccount extends Account {
    private static final double INTEREST_RATE = 0.03;

    public SavingsAccount(String accountNumber, double balance) {
        super(accountNumber, balance);
    }

    @Override
    public double getInterestRate() {
        return INTEREST_RATE;
    }
}