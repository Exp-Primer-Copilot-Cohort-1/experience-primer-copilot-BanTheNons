function skillsMember() {
    var member = {
        name: 'John Doe',
        age: 30,
        address: {
            street: '50 Main St.',
            city: 'Boston',
            state: 'MA'
        },
        skills: ['js', 'html', 'css']
    }
    var output = '';
    for (var key in member) {
        output += '<li>' + key + ': ' + member[key] + '</li>';
    }
    document.getElementById('output').innerHTML = output;
}