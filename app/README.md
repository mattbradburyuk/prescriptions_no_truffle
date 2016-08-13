#Prescription Dapp

To use:

1) Copy the app directory some where on your local drive

2) Install Chrome if you haven't got it

3) Install the meta mask plug in: https://metamask.io , play with the mouse tracking fox.

4) Set up an ethereum account on metamask 

5) Spin up a private geth node/ network (you don't want to spend real either on this) + fund main account by mining.

6) Point meta mask to the private geth node eg at 192.168.99.100:8541 (docker on mac) or localhost:8545 (running node locally)

7) Transfer some funds (eg 10 ether) from the private geth node's coinbase to the address held in the metamask wallet so you will be able to fund transactions. You should see these funds appear in the metamask drop down.

8) Make sure your private node is mining (or transactions won't go through)

9) Go to the app directory, run from terminal/ bash prompt: 

```bash
$ sh start_local_server.sh
```
this starts a mini local python server (you will need python 2.7 installed) which serves up local files as web pages

10) In chrome go to localhost:8000, click on create_new_prescription.html + open up the js console so you can see the log messages

11) Fill in some details (dose needs to be a number), Create a prescription.
 
12) metamask will ask you to authorise some transactions (it is signing the transactions as they are sent to ethereum)

13) After they have been mined (watch the logs as I haven't added a success message to the page) if nothing happens make sure you are mining.

14) In Chrome, go back to localhost:8000, click view_prescriptions.html

15) You should see your reference in the table, click the button and it will retrieve your prescription details from the block chain.

