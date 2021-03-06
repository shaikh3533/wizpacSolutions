import axios from "axios";


class GetData {
    OutstandingData = () => {
        // ,alert('1')
        const res = async () => {
            const resp = await axios
                .get("https://209.97.168.200/pacrawizpackv3/public/api/hamza-get-api")
                .catch(function (error) {
                    console.log(error);
                });

            return resp;
        };
        return res();
    };
    InProcess = () => {
        const res = async () => {
            const resp = await axios
                .get("https://209.97.168.200/pacrawizpackv3/public/api/in-process")
                .catch(function (error) {
                    console.log(error);
                });
            return resp;
        };
        return res();
    }
    UnFinished = () => {
        const res = async () => {
            const resp = await axios
                .get("https://209.97.168.200/pacrawizpackv3/public/api/un-finished")
                .catch(function (error) {
                    console.log(error);
                });
            return resp;
        };
        console.log(res(), "this is my unfinished");
        return res();
    }
    OpinionData = () => {
        const res = async () => {
            const resp = await axios
                .get("https://209.97.168.200/pacrawizpackv3/public/api/client-opinion-relation")
                .catch(function (error) {
                    console.log(error);
                });
            return resp;
        };
        return res();
    }
}
export default new GetData();