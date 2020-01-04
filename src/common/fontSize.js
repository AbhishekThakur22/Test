import { PixelRatio } from 'react-native'

module.exports = {
    fontSmall() {
        if (PixelRatio.get() <= 1) {
            return 12
        }
        else if (PixelRatio.get() > 1 && PixelRatio.get() <= 1.5) {
            return 14
        }
        else if (PixelRatio.get() > 1.5 && PixelRatio.get() < 3) {
            return 16
        }
        else if (PixelRatio.get() >= 3 && PixelRatio.get() < 4) {
            return 18
        }
        else if (PixelRatio.get() >= 4 && PixelRatio.get() < 5) {
            return 20
        }
        else {
            return 14
        }
    },
    fontMedium() {
        if (PixelRatio.get() <= 1) {
            return 16
        }
        else if (PixelRatio.get() > 1 && PixelRatio.get() <= 1.5) {
            return 18
        }
        else if (PixelRatio.get() > 1.5 && PixelRatio.get() < 3) {
            return 20
        }
        else if (PixelRatio.get() >= 3 && PixelRatio.get() < 4) {
            return 20
        }
        else if (PixelRatio.get() >= 4 && PixelRatio.get() < 5) {
            return 22
        }
        else {
            return 20
        }
    },
    fontLarge() {
        if (PixelRatio.get() <= 1) {
            return 18
        }
        else if (PixelRatio.get() > 1 && PixelRatio.get() <= 1.5) {
            return 22
        }
        else if (PixelRatio.get() > 1.5 && PixelRatio.get() < 3) {
            return 24
        }
        else if (PixelRatio.get() >= 3 && PixelRatio.get() < 4) {
            return 25
        }
        else if (PixelRatio.get() >= 4 && PixelRatio.get() < 5) {
            return 24
        }
        else {
            return 18
        }
    }
}
