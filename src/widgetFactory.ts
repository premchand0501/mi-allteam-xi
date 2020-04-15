 function Get_all_team(layout: string){
        switch(layout){
            case 'widget-layout-1':
                            return import(/* webpackChunkName: "all-team--widget-layout-1" */ './widgets/all-team/widget-layout-1');
            default:
                return null;
        }
    }
     export default function (widgetName: string, LayoutName: string){
    switch(widgetName) {
       case 'all-team':
                        return Get_all_team(LayoutName);
        default:
            return null;
    }
}