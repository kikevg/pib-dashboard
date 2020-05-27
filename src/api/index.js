
const getUrl = (country, indicator) => {
    return `https://api.worldbank.org/v2/country/${country}/indicator/${indicator}?format=json`;
}

export const fetchData = async () => {
    const sv = await (await fetch(getUrl('sv', 'NY.GDP.MKTP.CD'))).json();
    const gt = await (await fetch(getUrl('gt', 'NY.GDP.MKTP.CD'))).json();
    const hn = await (await fetch(getUrl('hn', 'NY.GDP.MKTP.CD'))).json();
    const ni = await (await fetch(getUrl('ni', 'NY.GDP.MKTP.CD'))).json();
    const cr = await (await fetch(getUrl('cr', 'NY.GDP.MKTP.CD'))).json();
    const pa = await (await fetch(getUrl('pa', 'NY.GDP.MKTP.CD'))).json();
    const growsv = await (await fetch(getUrl('sv', 'NY.GDP.MKTP.KD.ZG'))).json();
    const growgt = await (await fetch(getUrl('gt', 'NY.GDP.MKTP.KD.ZG'))).json();
    const growhn = await (await fetch(getUrl('hn', 'NY.GDP.MKTP.KD.ZG'))).json();
    const growni = await (await fetch(getUrl('ni', 'NY.GDP.MKTP.KD.ZG'))).json();
    const growcr = await (await fetch(getUrl('cr', 'NY.GDP.MKTP.KD.ZG'))).json();
    const growpa = await (await fetch(getUrl('pa', 'NY.GDP.MKTP.KD.ZG'))).json();

    const modifiedData = [{
        name: sv[1][0].country.value,
        value: sv[1][1].value.toFixed(2),
        growth: growsv[1][1].value.toFixed(1),
    }, {
        name: gt[1][0].country.value,
        value: gt[1][1].value.toFixed(2),
        growth: growgt[1][1].value.toFixed(1),
    }, {
        name: hn[1][0].country.value,
        value: hn[1][1].value.toFixed(2),
        growth: growhn[1][1].value.toFixed(1),
    }, {
        name: ni[1][0].country.value,
        value: ni[1][1].value.toFixed(2),
        growth: growni[1][1].value.toFixed(1),
    }, {
        name: cr[1][0].country.value,
        value: cr[1][1].value.toFixed(2),
        growth: growcr[1][1].value.toFixed(1),
    }, {
        name: pa[1][0].country.value,
        value: pa[1][1].value.toFixed(2),
        growth: growpa[1][1].value.toFixed(1),
    }];
    return modifiedData;
}

export const fetchActivities = async (country) => {

    const industryValueAdded = await (await fetch(getUrl(country, 'NV.IND.MANF.ZS'))).json();
    const industry = await (await fetch(getUrl(country, 'NV.IND.MANF.CD'))).json()
    const agricultureValueAdded = await (await fetch(getUrl('sv', 'NV.AGR.TOTL.ZS'))).json();
    const agriculture = await (await fetch(getUrl(country, 'NV.AGR.TOTL.CD'))).json()
    const imp = await (await fetch(getUrl(country, 'TM.VAL.MRCH.CD.WT'))).json();
    const exp = await (await fetch(getUrl(country, 'TX.VAL.MRCH.CD.WT'))).json();

    const modifiedData = [
        {
            name: 'Industria',
            value: industry[1][1].value,
            valueAdded: industryValueAdded[1][1].value
        },
        {
            name: 'Agricultura',
            value: agriculture[1][1].value,
            valueAdded: agricultureValueAdded[1][1].value
        },
        {
            name: 'Exportaciones',
            value: exp[1][1].value,
            valueAdded: 0
        },
        {
            name: 'Importaciones',
            value: imp[1][1].value,
            valueAdded: 0
        },
    ];
    return modifiedData;
}

export const fetchGrowthAnnual = async (country) => {
    const data = await (await fetch(getUrl(country, 'NY.GDP.MKTP.KD.ZG'))).json();
    const modifiedData = [];
    data[1].map(d => modifiedData.unshift({ date: d.date, value: parseFloat(d.value).toFixed(1) }));
    return modifiedData;
}

export const lastUpdated = async () => {
    const data = await (await fetch(getUrl('sv', 'NY.GDP.MKTP.CD'))).json();
    const date = data[0].lastupdated;
    return date;
} 
