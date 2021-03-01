export function logaTempoDeExecucao(emSegundos: boolean = false) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;

        descriptor.value = function (...args: any[]) {
            let unidade = 'ms';
            let divisor = 1;
            if (emSegundos) {
                unidade = 's';
                divisor = 1000;
            }
            console.log('-----------------');
            console.log(`parâmetros passados para o método ${propertyKey}: ${JSON.stringify(args)}`)
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`O retorno do método ${propertyKey} é ${JSON.stringify(retorno)}`);
            console.log(`O método ${propertyKey} demorou ${(t2 - t1) / divisor} ${unidade}`);
            return retorno;

        }

        return descriptor;

    }

}