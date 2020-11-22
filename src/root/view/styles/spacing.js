import Constants from 'expo-constants'

export const statusBarMargin = {
    marginTop: Constants.statusBarHeight,
}

export const statusBarPadding = {
    paddingTop: Constants.statusBarHeight,
}

// Paddings

//  Padding by percentage


export const px0P = {
    paddingLeft: 0,
    paddingRight: 0
}

export const px1P = {
    paddingLeft: '5%',
    paddingRight: '5%'
}

export const px2P = {
    paddingLeft: '10%',
    paddingRight: '10%'
}

export const px3P = {
    paddingLeft: '15%',
    paddingRight: '15%'
}

export const py0P = {
    paddingTop: 0,
    paddingBottom: 0
}

export const py1P = {
    paddingTop: '5%',
    paddingBottom: '5%'
}

export const py2P = {
    paddingTop: '8%',
    paddingBottom: '8%'
}

export const py3P = {
    paddingTop: '10%',
    paddingBottom: '10%'
}

export const p0P = {
    ...px0P,
    ...py0P,
}

export const p1P = {
    ...px1P,
    ...py1P,
}

export const p2P = {
    ...px2P,
    ...py2P,
}

export const p3P = {
    ...px3P,
    ...py3P,
}


// Fixed size paddings
const l1 = 10;
const l2 = 20;
const l3 = 30;

export const px0F = px0P;

export const px1F = {
    paddingLeft: l1,
    paddingRight: l1,
}

export const px2F = {
    paddingLeft: l2,
    paddingRight: l2,
}

export const px3F = {
    paddingLeft: l3,
    paddingRight: l3,
}

export const py0F = px0P;

export const py1F = {
    paddingTop: l1,
    paddingBottom: l1,
}

export const py2F = {
    paddingTop: l2,
    paddingBottom: l2,
}

export const py3F = {
    paddingTop: l3,
    paddingBottom: l3,
}

export const p0F = {
    ...px0F,
    ...py0F,
}

export const p1F = {
    ...px1F,
    ...py1F,
}

export const p2F = {
    ...px2F,
    ...py2F,
}

export const p3F = {
    ...px3F,
    ...py3F,
}

export const px0 = px0F;

export const px1 = px1F;

export const px2 = px2F;

export const px3 = px3F;

export const py0 = py0F;

export const py1 = py1F;

export const py2 = py2F;

export const py3 = py3F;

export const p0 = p0F;

export const p1 = p1F;

export const p2 = p2F;

export const p3 = p3F;