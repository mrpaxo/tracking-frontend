export class Credentials {
    username:string;
    access_token:string;
    expires_in:number;
    timestamp:Date;

    constructor(o:any){
        this.username = o.username;
        this.expires_in = o.expires_in;
        this.access_token = o.access_token;
        this.timestamp = o.timestamp? new Date(o.timestamp):new Date();
    };

    public static _getCookie(name:string){
        let n = name + "=";
        let ca = document.cookie.split(';');
        for(let i=0; i<ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(n) == 0) return c.substring(n.length,c.length);
        }
        return "";
    };

    public hasNotExpired():boolean {
      let now = new Date();
      console.log(this.timestamp.getTime(),'+++++++++')
      let dif = this.timestamp.getTime() - now.getTime();
      
      return this.expires_in > Math.abs(dif / 1000)-300;
    };

    public static loadFromCookie(name:string):Credentials {
        let value:any = Credentials._getCookie(name);
        if(value){
            value = atob(value);
            value = JSON.parse(value);
            console.log(value);
            return new Credentials(value);
        } else {
            value = null
            return value ;
        }
    };

    public saveToCookie(name:string):void {
        let value = JSON.stringify(this);
        value = btoa(value);
        let d = new Date();
        d.setTime(d.getTime() + this.expires_in*1000);
        let expires = "expires="+d.toUTCString();

        document.cookie=name+'='+value+'; '+expires;
    };

    public deleteCookie(name:string):void {
        document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = name + '=; path=/url/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        
    };
}
