/* 
 * cptn - The Image Captioner
 * Version 1.0
 * by the Mewtwo Death Cult (videotoblin)
 * 
 * I desperately hope someone finds a use for
 * this code, because I hereby release it into
 * the public domain. This iteration of cptn is 
 * pretty shit, so please, PLEASE feel free to
 * improve it.
 * 
 * No warranties! If your computer does a fuckin
 * whoopsie and releases toxic purple gas and
 * kills your entire family, it must suck to be
 * you.
 * 
 * Oh, and this is written for Mono, not .NET.
 * It might still work, but it also might not.
 */


using System;
using System.Drawing;

namespace cptn
{
    class MainClass
    {
        public static void Error(string error)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.Write("[error] ");
            Console.ResetColor();
            Console.WriteLine(error);
        }

        public static void Usage()
        {
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.Write("[usage] ");
            Console.ResetColor();
            Console.WriteLine("cptn [image path] [output path] [caption text] [top/bottom]");
        }

        public static void Main(string[] args)
        {
            // Parse thru arguments
            if (args.Length != 4)
            {
                if (args.Length > 3)
                    Error("too many arguments");
                else
                    Error("not enough arguments");
                Usage();
                Environment.Exit(1);
            }

            bool CaptionTop = false;

            switch (args[3].ToLower()) {
                case "top":
                    CaptionTop = true;
                    break;
                case "bottom":
                    CaptionTop = false;
                    break;
                default:
                    Error("orientation must be top or bottom");
                    break;
            }

            // Attempt to open the image
            Image UncaptionedImage = null;
            try
            {
                UncaptionedImage = Image.FromFile(args[0]);
            }
            catch
            {
                Error("could not open image \""+args[0]+"\"");
                Environment.Exit(2);
            }

            // We'll need these to size and position the image.
            int lines = args[2].Split('\n').Length;

            Bitmap CaptionedImage = new Bitmap(UncaptionedImage.Width, UncaptionedImage.Height + (16 * lines) + 8);

            Graphics CaptionGraphics = Graphics.FromImage(CaptionedImage);
            if (CaptionTop == true) {
                CaptionGraphics.DrawImage(UncaptionedImage, 0, lines*16+4);
                CaptionGraphics.FillRectangle(
                    Brushes.White,
                    new Rectangle(0, 0, CaptionedImage.Width, lines * 16 + 4)
                );
                CaptionGraphics.DrawString(
                    args[2],
                    new Font(new FontFamily(System.Drawing.Text.GenericFontFamilies.Monospace), 14, FontStyle.Bold),
                    Brushes.Black,
                    6, 2
                );
            }
            else
            {
                CaptionGraphics.FillRectangle(
                    Brushes.White,
                    new Rectangle(0, UncaptionedImage.Height + 4, CaptionedImage.Width, lines * 16 + 4)
                );
                CaptionGraphics.DrawImage(UncaptionedImage, 0, 0);
                CaptionGraphics.DrawString(
                    args[2],
                    new Font(new FontFamily(System.Drawing.Text.GenericFontFamilies.Monospace), 14, FontStyle.Bold),
                    Brushes.Black,
                    6, UncaptionedImage.Height + 4
                );
            }

            CaptionedImage.Save(args[1]);
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("Image captioned!");
            Console.ResetColor();
        }
    }
}
