# AzureHeads stocks-demo

This is a demo app that utilizes Azure Functions / CosmosDB and Azure SignalR

&nbsp;

# Prerequisites

You need to install the following software in case they are not available in your machine.


* **Node** - [info](https://nodejs.org/en/download/)
* **Azure CLI** - [info](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)
* **Azure Functions Core Tools** - [info](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Ccsharp%2Cbash)
* **Yarn** - [info](https://classic.yarnpkg.com/en/docs/install/#windows-stable) (optional)

&nbsp;
# Azure Resources

Before you get started, you need to create the following Azure Resources:

## Create Azure Cosmos DB

You can find more info [here](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction). 

### No subscription available?
You can try Azure CosmosDB for a limited time with no subscription or credit-card number required.
For more info please visit this [link](https://azure.microsoft.com/en-us/try/cosmosdb/).

## Create Azure SignalR

You can find more info [here](https://azure.microsoft.com/en-us/services/signalr-service/). 

&nbsp;

# Getting Started

## Step 1: Install all depdendencies

To install all dependencies and please run the following command:
```
yarn install
```

This command will run also a script to initialize a sample db in your Azure Cosmos DB service.

**Note:** Please update CosmosDB Connection string and key in `local.settings.json` file.

## Step 2: Run your azure functions locally

If you have properly installed Azure Functions Core Tools CLI you can start your functions with the following command:
```
func start
```


## Step 3: Run the demo web app
To start the web application you can run the following command:
```
yarn start
```

## Step 4: Update data in your database
To update prices for the records in your Cosmos DB you can run the following command.
```
yarn update-data
```

