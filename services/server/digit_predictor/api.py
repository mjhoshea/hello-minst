from typing import Any

import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from digit_predictor.classifier.model import Model, get_model

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_headers=['*'],
    allow_credentials=True,
    allow_methods=['*'],
)


class DigitClassificationRequest(BaseModel):
    canvas_points: Any


class DigitClassificationResponse(BaseModel):
    predicted_digit: int


@app.post("/predict", response_model=DigitClassificationResponse)
def predict():
    return DigitClassificationResponse(predicted_digit="9")


@app.post("/test", response_model=DigitClassificationResponse)
def test(digitReq: DigitClassificationRequest, model: Model = Depends(get_model)):
    predictions = model.predict(digitReq)
    predictions = predictions[0].detach().numpy()
    return DigitClassificationResponse(
        predicted_digit = predictions.argmax()
    )


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
