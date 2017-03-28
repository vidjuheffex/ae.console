var project = app.project;
var items = project.items;
var renderQueue = project.renderQueue;
var selection = project.selection;

(function myScript(thisObj){
    
    var commandHistory = []
    var commandIndex = 1;
    
    function pressed(k){
        if (k.keyName == 'Enter'){
            evalExpr();
        }
        else if (k.keyName == 'Up'){
            if (commandHistory.length - commandIndex >= 0) {                
            win.consoleInput.text = commandHistory[commandHistory.length - commandIndex]
            commandIndex += 1;
            }
        }
    }

    function evalExpr(){
        commandHistory.push(win.consoleInput.text)
        commandIndex = 1;
        try {
             $.global.eval(win.consoleInput.text)
             win.consoleInput.text = "";
         } catch (err) {
            win.consoleInput.text = err;      
            win.grp.graphics.backgroundColor =  win.grp.graphics.newBrush(win.grp.graphics.BrushType.SOLID_COLOR, [1, 0.2, 0.2, 1], 1)
         }          
     }
 
    function handleChange(){
        win.grp.graphics.backgroundColor =  win.grp.graphics.newBrush(win.grp.graphics.BrushType.SOLID_COLOR, [1, 0.2, 0.2, 0], 1)
    }

    var win = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Console", undefined, {resizeable:true});
    win.orientation = 'row';
    win.margins = -1;
    win.spacing = 0;
    win.grp = win.add('group')
    win.grp.alignment = ['fill','fill']
    win.consoleInput = win.grp.add('edittext', undefined,"",{borderless:true})
    win.consoleInput.alignment = ['fill','top']
    win.consoleInput.onChanging = handleChange;
    win.evalBtn = win.add('button', undefined, "Eval")
    win.evalBtn.alignment = ['right','top']
    win.evalBtn.onClick = evalExpr;    
    win.addEventListener ("keydown", function (kd) {pressed (kd)});    
    win.layout.layout(true);
    win.layout.resize();
    win.onResizing = win.onResize = function () {this.layout.resize();}

    if ((win != null) && (win instanceof Window)) {
        win.center();
        win.show();
    }
}(this))
