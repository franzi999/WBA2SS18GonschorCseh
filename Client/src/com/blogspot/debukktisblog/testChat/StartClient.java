package com.blogspot.debukktisblog.testChat;

import java.util.Random;

public class StartClient {

	public static void main(String[] args) {
		ChatClient client = new ChatClient("localhost", 3001, 10*1000, true);
		
		try{
			Thread.sleep(5000);
		} catch (InterruptedException e){ 
		e.printStackTrace();
		}
	
		 client.Quiz("Quizfrage" + new Random().nextInt(9999), "Das ist eine Testfrage");
	}

}
