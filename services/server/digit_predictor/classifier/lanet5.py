import torch.nn as nn
import torch.nn.functional as F


class LaNet5(nn.Module):
    def __init__(self):
        super(LaNet5, self).__init__()
        self.conv1 = nn.Conv2d(in_channels=1, out_channels=6, kernel_size=5, stride=1, padding=2, bias=True)
        self.maxpool1 = nn.MaxPool2d(kernel_size=2, stride=2)
        self.conv2 = nn.Conv2d(in_channels=6, out_channels=16, kernel_size=5, stride=1, bias=True)
        self.maxpool2 = nn.MaxPool2d(kernel_size=2, stride=2)
        self.conv3 = nn.Conv2d(in_channels=16, out_channels=120, kernel_size=5, stride=1, bias=True)
        self.lin1 = nn.Linear(in_features=120, out_features=84, bias=True)
        self.lin2 = nn.Linear(in_features=84, out_features=10)

    def forward(self, image):
        out = F.relu(self.conv1(image))
        out = self.maxpool1(out)
        out = F.relu(self.conv2(out))
        out = self.maxpool2(out)
        out = F.relu(self.conv3(out))
        out = out.view(image.size(0), -1)
        out = F.relu(self.lin1(out))
        out = F.relu(self.lin2(out))
        return out
