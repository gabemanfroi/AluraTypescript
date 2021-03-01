System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var View;
    return {
        setters: [],
        execute: function () {
            View = class View {
                constructor(seletor, escapar = false) {
                    const t1 = performance.now();
                    this._elemento = $(seletor);
                    this._escapar = escapar;
                    const t2 = performance.now();
                    console.log(`Tempo de execução:${t2 - t1} ms`);
                }
                update(model) {
                    this._elemento.html(this.template(model));
                }
            };
            exports_1("View", View);
        }
    };
});
