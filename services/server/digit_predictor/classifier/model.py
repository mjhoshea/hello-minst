import numpy as np
import torch
from torchvision import transforms

from digit_predictor.classifier.lanet5 import LaNet5


def prepare_image_tensor(req):
    img = np.zeros((28, 28))
    for lines in req.canvas_points['lines']:
        for points in lines['points']:
            x = int((round(points['x']) / 400) * 28)
            y = int((round(points['y']) / 400) * 28)
            img[y][x] = 1

    transform = transforms.Compose([transforms.ToTensor(),
                                    transforms.Normalize((0.5,), (0.5,)),
                                    ])

    img = transform(img)
    return img[None].float()


class Model:

    def __init__(self):
        self.device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
        classifier = LaNet5()
        classifier.load_state_dict(torch.load('assets/lanet5.pt', map_location='cpu'))
        classifier.eval()
        self.classifier = classifier.to(self.device)

    def predict(self, req):
        image_tensor = prepare_image_tensor(req)
        output = self.classifier(image_tensor)
        return output


model = Model()


def get_model():
    return model
