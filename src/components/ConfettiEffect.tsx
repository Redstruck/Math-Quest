import React, { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container, Engine } from 'tsparticles';

interface ConfettiEffectProps {
  trigger: boolean;
  onComplete?: () => void;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ trigger, onComplete }) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    if (container && trigger) {
      // Trigger the confetti burst
      await container.refresh();
      
      // Auto-complete after animation duration
      if (onComplete) {
        setTimeout(onComplete, 3000);
      }
    }
  }, [trigger, onComplete]);

  if (!trigger) return null;

  return (
    <Particles
      id="confetti-particles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          zIndex: 1000
        },
        particles: {
          number: {
            value: 0
          },
          color: {
            value: [
              "#FFD700", // Gold
              "#FF6B35", // Orange-red
              "#F7931E", // Orange
              "#00FFFC", // Cyan
              "#FC00FF", // Magenta
              "#32CD32", // Lime green
              "#FF1493", // Deep pink
              "#00BFFF"  // Deep sky blue
            ]
          },
          shape: {
            type: [
              "circle",
              "square",
              "triangle"
            ]
          },
          opacity: {
            value: {
              min: 0,
              max: 1
            },
            animation: {
              enable: true,
              speed: 2,
              startValue: "max",
              destroy: "min"
            }
          },
          size: {
            value: {
              min: 3,
              max: 8
            }
          },
          links: {
            enable: false
          },
          life: {
            duration: {
              sync: true,
              value: 5
            },
            count: 1
          },
          move: {
            enable: true,
            gravity: {
              enable: true,
              acceleration: 15
            },
            speed: {
              min: 15,
              max: 25
            },
            decay: 0.1,
            direction: "none",
            straight: false,
            outModes: {
              default: "destroy",
              top: "none"
            }
          },
          rotate: {
            value: {
              min: 0,
              max: 360
            },
            direction: "random",
            move: true,
            animation: {
              enable: true,
              speed: 60
            }
          },
          tilt: {
            direction: "random",
            enable: true,
            move: true,
            value: {
              min: 0,
              max: 360
            },
            animation: {
              enable: true,
              speed: 60
            }
          },
          roll: {
            darken: {
              enable: true,
              value: 25
            },
            enable: true,
            speed: {
              min: 15,
              max: 25
            }
          },
          wobble: {
            distance: 30,
            enable: true,
            move: true,
            speed: {
              min: -15,
              max: 15
            }
          }
        },
        emitters: [
          {
            position: {
              x: 25,
              y: 50
            },
            life: {
              count: 0,
              duration: 0.1,
              delay: 0.1
            },
            rate: {
              delay: 0.05,
              quantity: 50
            },
            size: {
              width: 0,
              height: 0
            }
          },
          {
            position: {
              x: 75,
              y: 50
            },
            life: {
              count: 0,
              duration: 0.1,
              delay: 0.1
            },
            rate: {
              delay: 0.05,
              quantity: 50
            },
            size: {
              width: 0,
              height: 0
            }
          },
          {
            position: {
              x: 50,
              y: 30
            },
            life: {
              count: 0,
              duration: 0.1,
              delay: 0.2
            },
            rate: {
              delay: 0.05,
              quantity: 75
            },
            size: {
              width: 0,
              height: 0
            }
          }
        ]
      }}
    />
  );
};

export default ConfettiEffect;