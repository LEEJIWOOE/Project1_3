from flask import Flask, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)
app.debug = True

class Newchat(Resource):
    def get(self):
        data= [
            {
                "level1": [
                    {
                        "name": "신발",
                        "number": 1,
                        "message": "<br>아래에서 주제를 선택해주세요:<p>",
                        "level2": [
                            {
                                "name": "운동화",
                                "number": 1,
                                "message": "<br>저희 매장은 Nike 전문 매장입니다. 상세정보를 보여드립니다.<p>"
                            },
                            {
                                "name": "구두",
                                "number": 2,
                                "message": "<br>저희 매장은 수제구두 전문 매장입니다. 상세정보를 보여드립니다.<p>"
                            },
                            {
                                "name": "샌들",
                                "number": 3,
                                "message": "<br>저희 매장은 고급 샌들 전문 매장입니다. 상세정보를 보여드립니다.<p>"
                            },
                            {
                                "name": "상위메뉴",
                                "number": 0,
                                "message": "<br> 상위 메뉴로 이동합니다. </p>"
                            }
                        ]
                    },
                    {
                        "name": "의류",
                        "number": 2,
                        "message": "<br>아래에서 주제를 선택해주세요:<p>",
                        "level2": [
                            {
                                "name": "여성의류",
                                "number": 1,
                                "message": "<br>저희 매장은 지그재그 재휴 매장입니다. 상세정보를 보여드립니다.<p>"
                            },
                            {
                                "name": "남성의류",
                                "number": 2,
                                "message": "<br>저희 매장은 정장 전문 매장입니다. 상세정보를 보여드립니다.<p>"
                            },
                            {
                                "name": "유아의류",
                                "number": 3,
                                "message": "<br>저희 매장은 아가방 전문 매장입니다. 상세정보를 보여드립니다.<p>"
                            },
                            {
                                "name": "상위메뉴",
                                "number": 0,
                                "message": "<br> 상위 메뉴로 이동합니다. </p>"
                            }
                        ]
                    }
                ]
            }

        ]
        return jsonify(data)

# api.add_resource(클래스명, URL 경로)
api.add_resource(Newchat,'/chatdata')

if __name__ == '__main__':
    app.run(host='localhost')
