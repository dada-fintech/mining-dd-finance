
const commonABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "spender",
                "type": "address"
            },
            {
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "from",
                "type": "address"
            },
            {
                "name": "to",
                "type": "address"
            },
            {
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "spender",
                "type": "address"
            },
            {
                "name": "addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseAllowance",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "to",
                "type": "address"
            },
            {
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "account",
                "type": "address"
            }
        ],
        "name": "isPauser",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "renouncePauser",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "from",
                "type": "address"
            },
            {
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "burnFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "account",
                "type": "address"
            }
        ],
        "name": "addPauser",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "account",
                "type": "address"
            }
        ],
        "name": "addMinter",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "renounceMinter",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "spender",
                "type": "address"
            },
            {
                "name": "subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseAllowance",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "to",
                "type": "address"
            },
            {
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "account",
                "type": "address"
            }
        ],
        "name": "isMinter",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "owner",
                "type": "address"
            },
            {
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "symbol",
                "type": "string"
            },
            {
                "name": "decimals",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "account",
                "type": "address"
            }
        ],
        "name": "MinterAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "account",
                "type": "address"
            }
        ],
        "name": "MinterRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Paused",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Unpaused",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "account",
                "type": "address"
            }
        ],
        "name": "PauserAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "account",
                "type": "address"
            }
        ],
        "name": "PauserRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    }
]

//template_id 1: moneyDao 定时筹款，投票释放
// template_id 2: moneyDaoFullRelease 定时筹款，全款释放
// template_id 3: moneyDaoFixRaise 定期筹款，投票释放
// template_id 4: moneyDaoFixRaiseFullRelease 定期筹款，全款释放


// export default {
//     network: 'ethereum',
//     mode: 'prod',
//     provider: 'wss://mainnet.infura.io/ws/v3/89db527f19e14a00902a439ae587a25b',
//     chainId: 1,
//     baseURL: 'https://mining-api.dd.finance',
//     assetURL: 'https://mining-assets.dd.finance',
//     commonABI,
//     templateIds: ['1', '2', '3', '4'],
//     //设置了之后，会占用首页广告位
//     featuredId: 'fd7798d918799f5f1c7cc98a8900feb69d6a8cbb5dc8f036477fc4bca349e405',
//     usdAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
//     usdUnit: 'USDT',
// }

// binance testnet
// export default {
//     network: 'binance',
//     mode: 'test',
//     provider: 'https://data-seed-prebsc-1-s1.binance.org:8545',
//     chainId: 97,
//     baseURL: 'https://mining-api-test.dd.finance',
//     assetURL: 'https://mining-assets-test.dd.finance',
//     commonABI,
//     templateIds: ['1', '2', '3', '4'],
//     usdAddress: '0xB2eA07bd51527179a366CBB699aE7164F9B5E509',
//     usdUnit: 'BUSD',
// }

// binance mainnet
export default {
    network: 'binance',
    mode: 'prod',
    provider: 'https://bsc-dataseed.binance.org/',
    chainId: 56,
    baseURL: 'https://mining-api-binance.dd.finance',
    assetURL: 'https://mining-assets-binance.dd.finance',
    commonABI,
    templateIds: ['1', '2', '3', '4'],
    featuredId: '08b90ac9c815f82277463d63152d2822ba192d33fda2d74e2651a505b1678ff6',
    usdAddress: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    usdUnit: 'BUSD',
}


//infura
// export default {
//     network: 'ethereum',
//     mode: 'test',
//     provider: 'https://kovan.infura.io/v3/e468cafc35eb43f0b6bd2ab4c83fa688',
//     chainId: 42,
//     baseURL: 'https://mining-api-test.dd.finance',
//     assetURL: 'https://mining-assets-test.dd.finance',
//     commonABI,
//     templateIds: ['1', '2', '3', '4']
//     usdAddress: '',
//     usdUnit: 'USDT',

// }




