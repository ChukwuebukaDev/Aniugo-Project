import formatCurrency from '../../Scripts/utils/moneyFormating.js';
describe('Test Suite: FormatCurrency', () => {
    it('coverts cents into dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('Works with 0', ()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    });
    it('rounds up to the nearest cent', () =>{
        expect(formatCurrency(2000.5)).toEqual('20.01');
    })
});