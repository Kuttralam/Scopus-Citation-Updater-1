package test;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Demo2 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		 System.setProperty("webdriver.chrome.driver","C:\\Users\\sathiyajith\\Desktop\\chromedriver.exe");
		  WebDriver driver=new ChromeDriver();
		  driver.get("http://localhost:8000/index#Scopus");
		  driver.findElement(By.id("li2")).click();
		  driver.manage().window().maximize();
		  driver.findElement(By.id("keyWord")).sendKeys("gene");
		  driver.findElement(By.id("searchSubmit")).click();
		  String at=driver.getTitle();
		  System.out.println(at);
		  String et="Scopus Search";
		  driver.close();
		  if(at.equalsIgnoreCase(et)) {
			  System.out.println("Test success");
		  }
		  else {
			  System.out.println("test fail");
		  }
	}

}
