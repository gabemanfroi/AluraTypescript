export function domInject(seletor: string) {


    return function (target: any, key: string) {

        let elemento: JQuery;

        const getter = function () {

            if (!elemento) {
                elemento = $(seletor);
            }

            return elemento;
        }

        Object.defineProperty(target, key, {
            get: getter
        })

    }

}