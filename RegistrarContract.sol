    pragma solidity ^0.4.0;                                        
                                                                   
    contract RegistrarContract {                                           
        
        struct entry  {
            bytes32 id;
            bytes32 name;
            address id_address;
            address sc_address;
        }
         
    	struct registry {
    	    uint256 size;
		    bytes32 [] indices;    // use id as index
		    mapping(bytes32 => entry) entries;
		    mapping(bytes32 => bool) hasEntry;
	    }
	    
	    registry private registries;

        event EventForAddToRegistries(bytes32 id, bytes32 name, address id_address, address sc_adress);                    
        event EventForRemoveFromRegistries(bytes32 id);                    
        event EventForUpdateToRegistries(bytes32 id, bytes32 name, address id_address, address sc_adress);                    

        struct log_entry  {
            uint time;
            bytes32 id; 
            bytes32 name; 
            address id_address; 
            address sc_address;
            bytes32 note;   
        }
         
    	struct log {
		    uint256 size;    
		    mapping(uint256 => log_entry) log_entries;  // use seqnum as index
	    }

	    log private transactionLog;

        function RegistrarContract(address register_account)
        {   
            registerAccount=register_account;
        }                                                          

        address private registerAccount;

	    modifier mustBeRegister() {
		    if (msg.sender == registerAccount) {
		        _;
		    } else {
		        throw;
		    }
	    }

        function addToRegistries(bytes32 id, bytes32 name, address id_address, address sc_address) 
                            mustBeRegister {                            

            if(!registries.hasEntry[id]) {   
                // new entry, add index
                registries.indices.push(id);
                registries.hasEntry[id]=true;
                registries.entries[id]=entry(id, name, id_address, sc_address); 
                registries.size += 1;
            }else {
                throw;
            }

            uint time = now;
            transactionLog.size=transactionLog.size+1;
            transactionLog.log_entries[transactionLog.size]=log_entry(time,id,name,id_address,sc_address,"ADD"); 

            EventForAddToRegistries(id, name, id_address, sc_address);                    
        }                                                          

        /*todo optimized array */
        function removeFromRegistries(bytes32 id) 
                            mustBeRegister {                            

            if(registries.size == 0) {
                throw;
            }
            
            bytes32 name = registries.entries[id].name;
            address id_address = registries.entries[id].id_address;
            address sc_address = registries.entries[id].sc_address;

            if(registries.hasEntry[id]) {
                uint size = registries.indices.length;
                for(uint i=0;i<size;i++) {
                    if(registries.indices[i] == id) {
                        registries.indices[i] = registries.indices[size-1];
                        break;
                    }
                }                
                delete registries.indices[registries.size-1];
                registries.indices.length--;

                delete registries.entries[id];
                registries.hasEntry[id]=false;
                registries.size -= 1;

            }else {
                throw;
            }

            uint time = now;
            transactionLog.size=transactionLog.size+1;
            transactionLog.log_entries[transactionLog.size]=log_entry(time,id,name,id_address,sc_address,"REMOVE"); 

            EventForRemoveFromRegistries(id);                    
        }                                                          

        function updateAllToRegistries(bytes32 id, bytes32 name, address id_address, address sc_address) 
                            mustBeRegister {                            

            if(registries.hasEntry[id]) {   
                // new entry, add index
                registries.entries[id].name=name; 
                registries.entries[id].id_address=id_address; 
                registries.entries[id].sc_address=sc_address; 
            }else {
                throw;
            }

            uint time = now;
            transactionLog.size=transactionLog.size+1;
            transactionLog.log_entries[transactionLog.size]=log_entry(time,id,name,id_address,sc_address,"UPDATE"); 

            EventForUpdateToRegistries(id, name, id_address, sc_address);                    
        }                                                          

        function updateNameToRegistries(bytes32 id, bytes32 name) 
                            mustBeRegister {                            

            if(registries.hasEntry[id]) {   
                // new entry, add index
                registries.entries[id].name=name; 
            }else {
                throw;
            }

            uint time = now;
            transactionLog.size=transactionLog.size+1;
            transactionLog.log_entries[transactionLog.size]=log_entry(time,id,name,registries.entries[id].id_address,registries.entries[id].sc_address,"UPDATE_NAME"); 

            EventForUpdateToRegistries(id, name, registries.entries[id].id_address, registries.entries[id].sc_address);                    
        }                                                          

        function updateIdAddressToRegistries(bytes32 id, address id_address) 
                            mustBeRegister {                            

            if(registries.hasEntry[id]) {   
                // new entry, add index
                registries.entries[id].id_address=id_address; 
            }else {
                throw;
            }

            uint time = now;
            transactionLog.size=transactionLog.size+1;
            transactionLog.log_entries[transactionLog.size]=log_entry(time,id,registries.entries[id].name,id_address,registries.entries[id].sc_address,"UPDATE_IDADDRESS"); 

            EventForUpdateToRegistries(id, registries.entries[id].name, id_address, registries.entries[id].sc_address);                    
        }                                                          

        function updateSCAddressToRegistries(bytes32 id, address sc_address) 
                            mustBeRegister {                            

            if(registries.hasEntry[id]) {   
                // new entry, add index
                registries.entries[id].sc_address=sc_address; 
            }else {
                throw;
            }

            uint time = now;
            transactionLog.size=transactionLog.size+1;
            transactionLog.log_entries[transactionLog.size]=log_entry(time,id,registries.entries[id].name,registries.entries[id].id_address,sc_address,"UPDATE_SCADDRESS"); 

            EventForUpdateToRegistries(id, registries.entries[id].name, registries.entries[id].id_address, sc_address);                    
        }                                                          


        function checkRegistries(bytes32 id) constant returns(bytes32,address,address) {
            return (registries.entries[id].name, registries.entries[id].id_address, registries.entries[id].sc_address);
        }

        function checkRegistriesSize() constant returns(uint256){
            return registries.size;
        }

        function checkAddress() constant returns(address) {        
            return this;                                           
        }                                                          

        function checkMsgSender() constant returns(address) {
            return msg.sender;
        }
        
        function checkTxnLogBySeq(uint256 seq) constant returns(uint,bytes32,bytes32,address,address,bytes32){
            uint time = transactionLog.log_entries[seq].time;
            bytes32 id = transactionLog.log_entries[seq].id;
            bytes32 name = transactionLog.log_entries[seq].name;
            address id_address = transactionLog.log_entries[seq].id_address;
            address sc_address = transactionLog.log_entries[seq].sc_address;
            bytes32 note = transactionLog.log_entries[seq].note;
            
            return (time,id,name,id_address,sc_address,note);
        }

        function checkTxnLogSize() constant returns(uint256){
            return transactionLog.size;
        }

    } 