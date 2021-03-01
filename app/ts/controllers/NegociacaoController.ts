import { Negociacao, Negociacoes, NegociacaoParcial } from '../models/index';
import { NegociacoesView, MensagemView } from '../views/index';
import { domInject, throttle } from '../helpers/decorators/index'
import { NegociacaoService } from '../services/index';
import { imprime } from '../helpers/index'

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');
    private _service = new NegociacaoService();

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle(500)
    adiciona() {

        let data = new Date(this._inputData.val().replace(/-/g, ","));

        if (!this._ehDiaUtil(data)) {
            this._mensagemView.update('Somente negociações em dias úteis, verifique.')
            return
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');

        imprime(negociacao, this._negociacoes);
    }

    private _ehDiaUtil(data: Date) {
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }

    @throttle(500)
    importarDados() {

        this._service
            .obterNegociacoes(res => {
                if (res.ok) {
                    return res;
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then((negociacoesParaImportar: Negociacao[]) => {
                const negociacoesJaImportadas = this._negociacoes.paraArray();

                negociacoesParaImportar
                    .filter(negociacao =>
                        !negociacoesJaImportadas.some(JaImportada =>
                            negociacao.ehIgual(JaImportada)))
                    .forEach(negociacao =>
                        this._negociacoes.adiciona(negociacao));

                this._negociacoesView.update(this._negociacoes);
            });

    }

}

enum DiaDaSemana {

    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado

}