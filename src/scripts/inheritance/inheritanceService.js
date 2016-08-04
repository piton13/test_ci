export default class inheritanceService {

    constructor() {}

    getSuperClass() {
        var superClass = {
            name: 'superName',
            hierarchy: 1,
            children: {}
        };

        return superClass;
    }
}