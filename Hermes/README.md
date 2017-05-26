

# Hermes

ASP.NET (C#) Server side library based on SignalR persistent connection. Providing support for transfer text or binary data between clients. 

## Overview
### Communication
The library has implemented some basic communication templates:

* **OneToOneCommunication** is used for communication between two clients. Example usage of this template could be instant messenger application.
* **OneToManyCommunication** is used for communication where one sends data and others only receiving data. Example usage of this template could be online radio application.
* **ManyToManyCommunication** is used for communication of multiple clients with multiple clients where everybody sends and receives data. Example usage of this template could be online multiplayer game.
 
New communication template could be created by implementing *Communication.ICommunication* interface or by inheriting from *Communication.BaseCommunication* class or inheriting from existing other Communication class.

**Note:** Instances of communication are used to store information about communication session (IDs of clients, etc...).

### Connection
The connection is established using SignalR persistent connection. *Connection.BaseConnection* abstract class providing methods for handling and sending data through. The new connection could be created by inheriting from this class or using a *Connection.DefaultConnection* generic class which takes *Communication.ICommunication* as a generic parameter. DefaultConnection behavior is simple to check if data processing is allowed and resending of data to other clients participating in the same communication session.

## Usage
To map connection simply use an instance of Configuration.Configuration class and method MapConnection. Or use SignalR map syntax.
The example code below shows ASP.NET web applications Startup class with mapping of Hermes connection.

```csharp
public class Startup
{
	public void Configuration(IAppBuilder app)
	{
		var config = new Hermes.Configuration.Configuration();
		config.MapConnection<DefaultConnection<OneToOneCommunication>>("/hermes");
		config.Config(app);
	}
}
```

For more information about methods and classes look at documentation located at *doc* directory or [click here](https://miroslavpokorny.github.io/Hermes/Hermes/doc/).

## Supported servers
The library was tested on Windows 10 (1607 Anniversary Update) and IIS Express 10.


## License
This project is licensed under [Apache License, Version 2.0](http://www.apache.org/licenses)