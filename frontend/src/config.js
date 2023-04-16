export const SIMP_STORAGE_ADDRESS =
'0xd8cccE106e7E27339AC929e54Db6f3c8B049FEE0'
export const SIMP_STORAGE_ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "Toll_list",
      "outputs": [
        {
          "internalType": "string",
          "name": "toll_plaza_id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "toll_plaza_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "vehicle_Accts",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_vehnum",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_vehtype",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_vehmodel",
          "type": "string"
        }
      ],
      "name": "Register_Vehicle",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "Charge_balance",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_id",
          "type": "string"
        }
      ],
      "name": "Init_Toll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_vehnum",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_vehtype",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_vehmodel",
          "type": "string"
        }
      ],
      "name": "Check_ownership",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_tollname",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_vehnum",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_type",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_vehmodel",
          "type": "string"
        }
      ],
      "name": "Pay_Tolltax",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_num",
          "type": "string"
        }
      ],
      "name": "get_History",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "toll_plaza_id",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "toll_plaza_name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "time",
              "type": "uint256"
            }
          ],
          "internalType": "struct TollPlaza.Toll[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_num",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_type",
          "type": "string"
        }
      ],
      "name": "get_paidhistory",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "withdraw_amount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "destroy",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "check_balance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "get_owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]