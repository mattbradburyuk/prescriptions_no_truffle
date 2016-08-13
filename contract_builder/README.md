#contract_builder

Starting to build up some of the functions of truffle

## compiler

Usage:

```bash
$ cd compiler
$ node compiler.js -f <ContractName>.sol
```
 It will:
 
 * Look for <ContractName>.sol in 'source' directory
 * Remove the comments and collapse the file down to an input string for the solc compiler
 * Compile using solc
 * Create the <ContractName>.json file in 'compiled' which contains the output from the compiler
 * The .json contains all the info required to deploy and instance of the contract, either using the deployer, 
 * The .json can also be comppied across to the Dapp to be the template for the Dapp to deploy instances of the contract
 
 note, at the moment it can only compile single class contracts
 
 
## deployer
 
 There are two versions of deployer, the original: deploy_contract, and a version rewritten using promises: deploy_contract_prom
 
 Usage (use the promises one):
  
 You will need to change the rpc ip:port in deployer_config.js to point to your geth node's rpc port so it deploys to your chain.
  
 Then
  
```bash
$ cd deployer 
$ node deploy_contract_prom.js -f <ContractName>.json
```
 
 
It will: 
 
 * Look for <ContractName>.json and read it in
 * Unlock the account (you will have to go in and change the password for your account (currently set to mattpass)
 * Switch mining on (if not allready)
 * Deploy the contract to your node
 * Switch mining off if it wasn't on before
 * Log out the address of the new contract instance
 * Write the addressof the contract and the transaction that created it to a file called deployed/instance_of_<ContractName>.json


Note, using promises it is easy to see the sequential flow of the code:

```js
read_in_json()
    .then(unlock_acc)
    .then(toggle_mining_on)
    // .then(pass_though)
    .then(deploy_contract)
    .then(pass_though)
    .then(toggle_mining_off)
    .then(write_json_to_file)
    .then(end_success,end_error)
```

Even though many of the functions in the promises chain are asynchronous, each function will complete before the next function is called

##tester

Not looked at yet but promises are going to be important