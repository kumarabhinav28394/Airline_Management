
# AirlineManagment
TECH STACK USED
1.MERN 
2.Firebase cloud messaging
3.JWT
4.Razorpay payment gateway
5.Bcrypt

# Frontend(User only)
Frontend user interface :


![SearchFlight1way](https://github.com/user-attachments/assets/73c86120-82a9-4251-9604-bf56ded4fb35)


1.Have user signin and signup option with authorization  also can update personal information and change password and can add traveler's details.


i.Register/Signup:

![register](https://github.com/user-attachments/assets/9424c587-65a6-4087-984c-9ae7b5ed4879)

ii.Login/Signin

![userlogin](https://github.com/user-attachments/assets/3448d64d-7933-45f4-bd36-b931ac7a03dd)

iii.Update User Personal details

![adding user info](https://github.com/user-attachments/assets/5fedb7a2-f29d-4ab0-90b7-8e964c9f465c)

![edit profile](https://github.com/user-attachments/assets/09855c5f-566e-430b-952f-bb2cdad6dbd9)

iv.Change password and add traveler information

![Change password   add traveler](https://github.com/user-attachments/assets/404b4a6f-aa55-4ec2-a8f0-69c003568ae6)


![edit password](https://github.com/user-attachments/assets/a07d6d3a-5812-4cde-82db-833d6b01242f)



2.Searching Flight 

![SearchFlight2way](https://github.com/user-attachments/assets/66597d5f-22fc-4500-9e90-6f756b4b357e)

3.Available flight display (departure)

![FlightDisplay](https://github.com/user-attachments/assets/2a0fff9c-2eab-4df3-b237-5f831926c7ff)


4.Available flight display (Arrival  exclusively for round trip)

![selectionof Arr](https://github.com/user-attachments/assets/c6cdcf54-8fe6-4627-a1d2-498230436cf3)


5.Adding traveler details

![Adding passenger details](https://github.com/user-attachments/assets/fc5c6de3-53f3-43ea-aa07-3fd624cf2283)


6.Seat selection

![ChoosingSeat](https://github.com/user-attachments/assets/c9104317-92ba-4507-a1b8-a2368b33ece4)

![seatSelection before pay](https://github.com/user-attachments/assets/aad76b18-8ad8-4be3-93e8-b6f35188a61d)


 7.Payment
 
 i.Interface:
 
 ![payment interface](https://github.com/user-attachments/assets/b5f51c43-053e-4cc7-957f-713585acc461)

ii.Netbanking Selection:

![selecting netbanking](https://github.com/user-attachments/assets/a13df50c-97ea-4cb5-995d-c7c0e29561eb)

iii.Success Message:

![pay success](https://github.com/user-attachments/assets/f38d4793-a80e-43c8-98d0-8195cfe33291)

8.Booking Details After completion of payment

 ![booking brief ](https://github.com/user-attachments/assets/00a900b8-12e0-4b16-8271-69fdc436b768)

![booking details after completion](https://github.com/user-attachments/assets/ff8530b7-e3ff-42c9-88f9-04e64ce8fd5f)

9.Feedback

![feedback](https://github.com/user-attachments/assets/df951111-39ef-4a15-8797-5c3289774490)

10. Short video for complete round trip booking

<iframe title="vimeo-player" src="https://player.vimeo.com/video/994337323?h=e2a5f477d5" width="640" height="360" frameborder="0"    allowfullscreen></iframe>


# Company Portal(Managerial Side)

Company portal interface

![Company ui](https://github.com/user-attachments/assets/b284f1df-677e-4be3-8b53-4d0177e61baa)

1.Manager login

![Manager login](https://github.com/user-attachments/assets/4a2d3d19-8b1a-4b03-875f-ef460b43a6bf)

2.Add Flight 

![addingFlight](https://github.com/user-attachments/assets/fc722112-123d-465a-82d7-7da9a4a83e7c)

3.Update Flight

![Update flight](https://github.com/user-attachments/assets/9759427d-17f2-433e-93fd-aee743beb3bd)

i.Seat Manage and update

![seatmanage](https://github.com/user-attachments/assets/aa1af037-40cd-4d74-98c1-56b89f497517)


4.Add staff

![add staff in companyside](https://github.com/user-attachments/assets/f8412378-32d0-4577-ac81-a626d882ba47)

5.Notification

![Notification sending](https://github.com/user-attachments/assets/6692f09e-a5a5-4b65-8bf5-2889c6a466c5)

i.Sending Notification to single user

![sending notification to single user](https://github.com/user-attachments/assets/a3c5af9d-1cbb-45dd-bff5-8f59cf2037bf)

 ii.Broadcasting notification
 
![broadcasting notification](https://github.com/user-attachments/assets/8d55b847-b911-4576-b5b3-c09cb6cdf53d)

6.Check User from company portal

![check user from company side](https://github.com/user-attachments/assets/e59e64ef-039c-444b-8d31-165fd4ccde04)


# INSTRUCTIONS FOR RUNNING THE SERVER IN LOCALHOST


1.Open the folder AirlineManagement in terminal

2.Inside the Folder AirlineManagement there are three folder ---


  A.backend ---
  
    i.Change directory of backend folder  ( .....\AirlineManagement\backend>)
    
   ii.Run command  npm i              (.....\AirlineManagement\backend>npm i)
   
  iii.Run command  npm nodemon server.js .If your script is disabled then  run command  npx nodemon server.js
  
   iv.Make sure that you put .env file and required credential before running localhost.Look at line number 18 of server.js  for port information and change according to you. And if you change this port number then accordingly adjust frontend file which connect to backend   (frontend->src->components->API->api.js     line no 3.).

  B.frontendcompany   ---
    i.Now open a new terminal and change directory of frontendcompany folder ( .....\AirlineManagement\frontendcompany>)
    
   ii.Run command npm i      ( .....\AirlineManagement\frontendcompany>npm i)
   
  iii.Run command npm start
  
   iv.Make sure that your port 3000 is free and no other server is running on localhost:3000, otherwise change cors settings in the server file in backend folder.


  C.frontend   ---
  
    i.Now open a new terminal and change directory of frontend folder ( .....\AirlineManagement\frontend>)
    
   ii.Run command npm i      ( .....\AirlineManagement\frontend>npm i)
   
  iii.Run command npm start
  
   iv.Make sure that your port 3001 is free and no other server is running on localhost:3001, otherwise change cors settings in the server file in backend folder. Also put .env file with proper  entries in frontend folder for razorpay pyment gateway and Firebase notification.

   
Initialization   ---
  Initially there will be no flights or staff available in an empty database. To add flights and staff run the frontendcompany page. If the page is being opened first time ever. It will ask you to create a manager id and password and will save this in your database. Do Not forget the password as it is required to register new staffs to your company site. further the staffs or the manager both can add new flights and users will be able to see them in the frontend page.
  
   
