app.controller('transactionsController', function ($scope, $mdDialog, $mdToast, transactionsFactory) {

    // read transactions
    $scope.readTransactions = function () {
        transactionsFactory.readTransactions().then(function successCallback(response) {
            $scope.transactions = response.data;
        }, function errorCallback(response) {
            $scope.showToast("Error");
        });
    }

    // create transaction form (dialog)
    $scope.showCreateTransactionForm = function (event) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: './app/transactions/create_transaction.template.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            fullscreen: true
        });
    }

    // create new transaction
    $scope.createTransaction = function () {
        transactionsFactory.createTransaction($scope).then(function successCallback(response) {
            $scope.showToast('Created Successfully');
            $scope.readTransactions();
            $scope.cancel();
            $scope.clearTransactionForm();
        }, function errorCallback(response) {
            $scope.showToast("Error");
        });
    }

    // Read One Transaction
    $scope.readOneTransaction = function (id) {
        transactionsFactory.readOneTransaction(id).then(function successCallback(response) {
            $scope.id = response.data.id;
            $scope.user = response.data.user;
            $scope.amount = response.data.amount;
            $scope.currency = response.data.currency;
            $scope.txn_date = response.data.txn_date;

            $mdDialog.show({
                controller: DialogController,
                templateUrl: './app/transactions/read_one_transaction.template.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                fullscreen: true
            }).then(
                function () {
                    // 
                },
                function () {
                    $scope.clearTransactionForm();
                }
                );

        }, function errorCallback(response) {
            $scope.showToast("Error");
        });

    }

    // Update Transaction
    $scope.showUpdateTransactionForm = function (id) {
        transactionsFactory.readOneTransaction(id).then(function successCallback(response) {
            $scope.id = response.data.id;
            $scope.user = response.data.user;
            $scope.amount = parseInt(response.data.amount);
            $scope.currency = response.data.currency;
            $scope.txn_date = new Date(response.data.txn_date);

            $mdDialog.show({
                controller: DialogController,
                templateUrl: './app/transactions/update_transaction.template.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                fullscreen: true
            }).then(
                function () {
                    // 
                },
                function () {
                    $scope.clearTransactionForm();
                }
                );

        }, function errorCallback(response) {
            $scope.showToast("Error");
        });
    }

    // update transaction (API Call)
    $scope.updateTransaction = function () {
        transactionsFactory.updateTransaction($scope).then(function successCallback(response) {
            $scope.showToast('Updated successfully');
            $scope.readTransactions();
            $scope.cancel();
            $scope.clearTransactionForm();
        }, function errorCallback(response) {
            $scope.showToast("Error");
        });
    }

    // Confirmation to delete Transaction
    $scope.confirmDeleteTransaction = function (event, id) {
        $scope.id = id;
        var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete?')
            .textContent('Transaction once deleted cannot be retrieved.')
            .targetEvent(event)
            .ok('Confirm')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(
            function () {
                $scope.deleteTransaction();
            },
            function () {
                // 
            }
        );
    }

    // delete transaction
    $scope.deleteTransaction = function () {
        transactionsFactory.deleteTransaction($scope.id).then(function successCallback(response) {
            $scope.showToast('Deleted Successfully');
            $scope.readTransactions();
        }, function errorCallback(response) {
            $scope.showToast("Error");
        });

    }

    // clear data
    $scope.clearTransactionForm = function () {
        $scope.id = "";
        $scope.user = "";
        $scope.amount = 0.00;
        $scope.currency = "";
        $scope.txn_date = new Date();
    }

    // show toast message
    $scope.showToast = function (message) {
        $mdToast.show(
            $mdToast.simple()
                .textContent(message)
                .hideDelay(3000)
                .position("top right")
        );
    }

    // dialog
    function DialogController($scope, $mdDialog) {
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }
});