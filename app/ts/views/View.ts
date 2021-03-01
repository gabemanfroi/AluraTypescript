import { logaTempoDeExecucao } from '../helpers/decorators/logaTempoDeExecucao';

export abstract class View<T> {

    private _elemento: JQuery;
    private _escapar: boolean;

    constructor(seletor: string, escapar: boolean = false) {
        const t1 = performance.now();

        this._elemento = $(seletor);
        this._escapar = escapar
        const t2 = performance.now();
        console.log(`Tempo de execução:${t2 - t1} ms`);

    }

    update(model: T) {

        this._elemento.html(this.template(model));
    }

    abstract template(model: T): string;

}