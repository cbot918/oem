from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import pprint


app = FastAPI()

# 開放 cors 用
# # Enable CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # Allow your React frontend
#     allow_credentials=True,
#     allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
#     allow_headers=["*"],  # Allow all headers
# )


@app.get("/chart")
async def chart():
    file_name = "AAPL5.xlsx"
    res = aapl(file_name)
    print(len(res))
    return res


# Serve the React build folder
app.mount("/", StaticFiles(directory="ui/dist", html=True), name="static")


# 本地啟動用
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)



def aapl(file_path):
    # 讀取 Excel 檔案
    df = pd.read_excel(file_path)

    # 顯示前幾行資料
    # print(df.head())

    # 如果 Excel 沒有標題列，手動指定標題
    column_names = ["Date", "Open", "High", "Low", "Close", "Volume"]
    df = pd.read_excel(file_path, names=column_names)

    # 轉換日期格式
    df["Date"] = pd.to_datetime(df["Date"], format="%m/%d/%Y")

    json_data = df[["Date", "Close"]].to_dict(orient="records")

    # pprint.pprint(json_data)

    return json_data