#Prescriptions_no_truffle

##Objectives check list:

* Build out the prescriptions use case - in progress
* Build a truffle like framework which:
    * Can deploy contracts from the Dapp - yes
    * Uses promises - yes
    * Has smart contract testing -to do
    * Is easier to follow than truffle - it is for me :-)
    * Wait until mined style promises - yes

     
* Has a stand alone app that 
    * does not require a server component - yes, apart from still pulling in jquery and bootstrap
    * Has a useable frontend - basic
    * Has local storage in the Dapp - yes


## Overview

There are two bits to Prescription_no_truffle (really I should split them out)

1) A generic contract builder (in the contract builder directory) which:

* Compiles (single class) .sol files to a json contract object which can be used to deploy an instance of a contract programmatically
* Deploys an instance of the compiled contract
* see README.md in directory

2) A Dapp (in the app directory) which: 

* Models a doctors prescription as an instance of a smart contract
* Has a stand alone (no remote server) web page interface served from a local mini server)
* has a pge to create new instances of the prescriptions contract and deploy thm to the blockchain
* Keeps a list of addresses of created prescription contracts in local storage
* Can view created prescriptions and return the details from the blockchain
* see README.md in app directory


