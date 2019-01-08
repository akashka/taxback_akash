app.factory("transactionsFactory", function ($http, $filter) {

    var factory = {};

    // read all transactions
    factory.readTransactions = function () {
        return $http({
            method: 'GET',
            url: 'https://jointhecrew.in/api/txns/priya@gmail.com'
        });
    };

    // create transaction
    factory.createTransaction = function ($scope) {
        return $http({
            method: 'POST',
            data: {
                'id': $scope.id,
                'user': 'priya@gmail.com',
                'amount': $scope.amount,
                'currency': $scope.currency,
                'txn_date': $filter('date')($scope.txn_date, 'yyyy-MM-dd')
            },
            url: 'https://jointhecrew.in/api/txns/priya@gmail.com'
        });
    };

    // read one transaction
    factory.readOneTransaction = function (id) {
        return $http({
            method: 'GET',
            url: 'https://jointhecrew.in/api/txns/priya@gmail.com/' + id
        });
    };

    // update transaction
    factory.updateTransaction = function ($scope) {
        return $http({
            method: 'POST',
            data: {
                'id': $scope.id,
                'user': 'priya@gmail.com',
                'amount': $scope.amount,
                'currency': $scope.currency, 
                'txn_date': $scope.txn_date
            },
            url: 'https://jointhecrew.in/api/txns/priya@gmail.com/' + $scope.id
        });
    };

    // delete transaction
    factory.deleteTransaction = function (id) {
        return $http({
            method: 'DELETE',
            data: { 'id': id },
            url: 'https://jointhecrew.in/api/txns/priya@gmail.com/' + id
        });
    };

    return factory;
});