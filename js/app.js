$(document).ready(function() {

    // Load tracery grammars
    function loadGrammar(name) {
        $("#output").html("");

        var grammar = tracery.createGrammar(grammars[name]);

        for (var i = 0; i < 10; i++) {

            var s = grammar.flatten("#origin#");
            console.log(s);
            var div = $("<div/>", {
                class : "outputSample",
                html : s
            });

            $("#output").append(div);
        }

    }

    setTimeout(function() {
        loadGrammar("tester");

    }, 10);

    $('#grammarSelect').on('change', function() {
        loadGrammar(this.value);
    });
});
