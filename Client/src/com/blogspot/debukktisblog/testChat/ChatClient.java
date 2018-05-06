package com.blogspot.debukktisblog.testChat;

import com.blogspot.debukkitsblog.net.Client;
import com.blogspot.debukkitsblog.net.Datapackage;
import com.blogspot.debukkitsblog.net.Executable;

import java.net.Socket;

public class ChatClient extends Client {
	public ChatClient(String address, int port, int timeout, boolean autoKill){
		super(address, port, timeout);
		
		registerMethod("Quiz", new Executable(){
			public void run(Datapackage pack, Socket sock){
				System.out.println("[Quizfrage]" + pack.get(1)+ pack.get(1));
			}
				
		});
		
		start(); 
		}	
	
	
	public void Quiz(String frage, String antwort){
		sendMessage("Quizfrage", frage, antwort);
	}

	public void quiz(String string) {
		// TODO Auto-generated method stub
		
	}
	
}
